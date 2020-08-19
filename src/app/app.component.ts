import {Component, OnInit} from '@angular/core';
import {b} from '@angular/core/src/render3';


export interface IResult {
  tank: { spec: ISpec, player?: IPlayer };
  heal: { spec: ISpec, player?: IPlayer };
  dps1: { spec: ISpec, player?: IPlayer };
  dps2: { spec: ISpec, player?: IPlayer };
  dps3: { spec: ISpec, player?: IPlayer };
}

export interface ISpec {
  class: string;
  name: string;
  type: 'DpsCac' | 'Tank' | 'Heal' | 'DpsDistance';
  canBL: boolean;
  canBRez: boolean;
  color: string;
}

export interface IDPSConfig {
  meleeCount?: 1 | 2;
  rangeCount?: 1 | 2;
}

export interface IPlayer {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFaction: string;

  virginPlayers: IPlayer[] = [
    {name: 'Damian', selected: false},
    {name: 'Hugo', selected: false},
    {name: 'Pierre', selected: false},
    {name: 'Julien', selected: false},
    {name: 'Nicolas', selected: false},
  ];

  setup: IDPSConfig = {};

  factions = ['Alliance', 'Horde'];

  results: IResult[] = [];
  resultPoints: {[index: number] : number} = {};

  falseCompoCount: number = 0;

  forbidenPlayerClassCombos: string[] = ['Damian/Chasseur de démons', 'Nicolas/Guerrier/Armes', 'Nicolas/Guerrier/Fureur', 'Julien/Voleur'];
  forbidenPlayerRoleCombos: string[] = [''];

  report = {
    Damian: {tank: 0, dpsCac: 0, dpsDistance: 0, heal: 0},
    Hugo: {tank: 0, dpsCac: 0, dpsDistance: 0, heal: 0},
    Nicolas: {tank: 0, dpsCac: 0, dpsDistance: 0, heal: 0},
    Julien: {tank: 0, dpsCac: 0, dpsDistance: 0, heal: 0},
    Pierre: {tank: 0, dpsCac: 0, dpsDistance: 0, heal: 0},
  };

  setupDpsConfiguration() {
    const isPair = Math.floor(Math.random() * 100) % 2;
    const isForMelee = !!(Math.floor(Math.random() * 100) % 2);

    if (isForMelee) {
      this.setup.meleeCount = isPair ? 2 : 1;
      this.setup.rangeCount = isPair ? 1 : 2;
    } else {
      this.setup.meleeCount = isPair ? 1 : 2;
      this.setup.rangeCount = isPair ? 2 : 1;
    }
  }

  selectFaction() {
    this.selectedFaction = this.factions[Math.floor(Math.random() * this.factions.length)];
  }

  getRandomValueFromObject(obj: ISpec[], excludeClass: string[] = []) {
    let finalArray = [];
    let x = 50;
    while (x > 0) {
      let shuffleTankArray = this.shuffle(Array.from(obj));
      finalArray.push(shuffleTankArray[Math.floor(Math.random() * shuffleTankArray.length)]);
      x = x - 1;
    }

    if (excludeClass.length > 0) {
      finalArray = finalArray.filter(el => {
          return !excludeClass.includes(el.class);
        }
      );
    }

    return finalArray[Math.floor(Math.random() * finalArray.length)];
  }

  addPoints(index: number, points: number){
    this.resultPoints[index] += points;
  }

  isBestChoice(index: number){
    let currentIndexCount = this.resultPoints[index];
    return currentIndexCount && Object.values(this.resultPoints).filter(value => {
      return currentIndexCount < value
    }).length == 0
  }

  resetPoints(){
    let x = 9
    while (x >= 0){
      this.resultPoints[x] = 0;
      x--;
    }
  }

  generateResults() {
    let index = 0;
    this.falseCompoCount = 0;
    this.results = [];
    let x = 500;

    while (x > 0) {
      this.players = this.virginPlayers;
      this.players.map(el => el.selected = false);

      this.setupDpsConfiguration();


      let excludeClass: string[] = [];

      const tank: ISpec = this.getRandomValueFromObject(this.tanks, excludeClass);
      excludeClass.push(tank.class);

      const heal: ISpec = this.getRandomValueFromObject(this.heals, excludeClass);
      excludeClass.push(heal.class);

      const isDoubleRanged = this.setup.rangeCount > 1;
      const dps1: ISpec = this.getRandomValueFromObject(isDoubleRanged ? this.ranges : this.melees, excludeClass);
      excludeClass.push(dps1.class);

      const dps2: ISpec = this.getRandomValueFromObject(isDoubleRanged ? this.melees : this.ranges, excludeClass);
      excludeClass.push(dps2.class);

      const dps3: ISpec = this.getRandomValueFromObject(isDoubleRanged ? this.ranges : this.melees, excludeClass);
      excludeClass.push(dps3.class);


      let result: IResult = {
        tank: {spec: tank, player: this.selectPlayer()},
        heal: {spec: heal, player: this.selectPlayer()},
        dps1: {spec: dps1, player: this.selectPlayer()},
        dps2: {spec: dps2, player: this.selectPlayer()},
        dps3: {spec: dps3, player: this.selectPlayer()},
      };


      if (this.isValidResult(result)) {
        this.resultPoints[index] = 0;
        index++;
        this.results.push(result);
        x -= 1;
      } else {
        this.falseCompoCount += 1;
      }
    }

    this.report = this.makeReportFromResult(this.results);
    console.log('report',this.report);
  }

  isValidResult(result: IResult) {
    let selectedSpecs: ISpec[] = [];
    let playerClassList: string[] = [];
    let playerRoleList: string[] = [];
    let blCount: number = 0;
    let bRezCount: number = 0;

    Object.keys(result).map(function (role) {
      let player: IPlayer = result[role].player;
      let spec: ISpec = result[role].spec;
      selectedSpecs.push(spec);
      playerClassList.push(player.name + '/' + spec.class + '/' + spec.name);
      playerRoleList.push(player.name + '/' + role);
    });

    selectedSpecs.map(selectedSpec => {
      if(selectedSpec.canBL){
        blCount += 1;
      }

      if (selectedSpec.canBRez) {
        bRezCount += 1;
      }
    });

    let validClases : boolean = bRezCount == blCount && bRezCount + blCount == 2;

    if(!validClases){
      return false;
    }

    let playerClassFlag : boolean = false
    playerClassList.map(playerClass => {
      if(this.forbidenPlayerClassCombos.includes(playerClass)){
        playerClassFlag = true;
      }
    })

    let playerRoleFlag : boolean = false
    playerRoleList.map(playerClass => {
      if(this.forbidenPlayerRoleCombos.includes(playerClass)){
        playerRoleFlag = true;
      }
    })

    if(playerClassFlag || playerRoleFlag){
      this.falseCompoCount +=1;
      return false;
    }

    return true;
  }

  makeReportFromResult(globalResult: any) {
    let newReport = {
      Damian: {tank: 0, dpsCac: 0, dpsDistance: 0, heal: 0},
      Hugo: {tank: 0, dpsCac: 0, dpsDistance: 0, heal: 0},
      Nicolas: {tank: 0, dpsCac: 0, dpsDistance: 0, heal: 0},
      Julien: {tank: 0, dpsCac: 0, dpsDistance: 0, heal: 0},
      Pierre: {tank: 0, dpsCac: 0, dpsDistance: 0, heal: 0},
    };
    let allSpecs = [];
    let allTanks = [];
    let allHeals = [];
    let allDpsCac = [];
    let allDpsDistance = [];

    globalResult.map(result => {
      allSpecs.push({type: result.tank.spec.type, name: result.tank.spec.name});
      allSpecs.push({type: result.heal.spec.type, name: result.heal.spec.name});
      allSpecs.push({type: result.dps1.spec.type, name: result.dps1.spec.name});
      allSpecs.push({type: result.dps2.spec.type, name: result.dps2.spec.name});
      allSpecs.push({type: result.dps3.spec.type, name: result.dps3.spec.name});

      allTanks.push(result.tank.player.name);
      allHeals.push(result.heal.player.name);

      if (result.dps1.spec.type == 'DpsCac') {
        allDpsCac.push(result.dps1.player.name);
      } else {
        allDpsDistance.push(result.dps1.player.name);
      }
      if (result.dps2.spec.type == 'DpsCac') {
        allDpsCac.push(result.dps2.player.name);
      } else {
        allDpsDistance.push(result.dps2.player.name);
      }
      if (result.dps3.spec.type == 'DpsCac') {
        allDpsCac.push(result.dps3.player.name);
      } else {
        allDpsDistance.push(result.dps3.player.name);
      }
    });

    allTanks.map(el => {
      newReport[el].tank += 1;
    });

    allHeals.map(el => {
      newReport[el].heal += 1;
    });

    allDpsCac.map(el => {
      newReport[el].dpsCac += 1;
    });

    allDpsDistance.map(el => {
      newReport[el].dpsDistance += 1;
    });

    let test = [];
    allSpecs.map(el => {
      if (!!test[el.type] && !!test[el.type][el.name]) {
        test[el.type][el.name] += 1;
      } else if (!!test[el.type]) {
        test[el.type][el.name] = 1;
      } else {
        test[el.type] = [];
        test[el.type][el.name] = 1;
      }
    });

    return newReport;
  }

  selectPlayer() {
    let shufflePlayersArray = this.shuffle(Array.from(this.players.filter(el => !el.selected)));
    const playerchosen = shufflePlayersArray[Math.floor(Math.random() * shufflePlayersArray.length)];
    this.players.filter(el => el.name == playerchosen.name).map(el => el.selected = true);
    return playerchosen;
  }

  shuffle(arra1) {
    var ctr = arra1.length, temp, index;

    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
  }


  tanks: ISpec[] = [
    {class: 'Chevalier de la mort', name: 'Sang', type: 'Tank', canBRez: true, canBL: false, color:'#C41F3B'},
    {class: 'Moine', name: 'Maître Brasseur', type: 'Tank', canBRez: false, canBL: false, color:'#00FF96'},
    {class: 'Guerrier', name: 'Protection', type: 'Tank', canBRez: false, canBL: false, color:'#C79C6E'},
    {class: 'Druide', name: 'Gardien', type: 'Tank', canBRez: true, canBL: false, color:'#FF7D0A'},
    {class: 'Chasseur de démons', name: 'Vengeance', type: 'Tank', canBRez: false, canBL: false, color:'#A330C9'},
    {class: 'Paladin', name: 'Protection', type: 'Tank', canBRez: false, canBL: false, color:'#F58CBA'}
  ];

  heals: ISpec[] = [
    {class: 'Paladin', name: 'Sacré', type: 'Heal', canBRez: false, canBL: false, color:'#F58CBA'},
    {class: 'Prêtre', name: 'Sacré', type: 'Heal', canBRez: false, canBL: false, color:'#FFFFFF'},
    {class: 'Prêtre', name: 'Discipline', type: 'Heal', canBRez: false, canBL: false, color:'#FFFFFF'},
    {class: 'Druide', name: 'Restauration', type: 'Heal', canBRez: true, canBL: false, color:'#FF7D0A'},
    {class: 'Chaman', name: 'Restauration', type: 'Heal', canBRez: false, canBL: true, color:'#0070DE'},
    {class: 'Moine', name: 'Tisse-brume', type: 'Heal', canBRez: false, canBL: false, color:'#00FF96'}
  ];

  ranges: ISpec[] = [
    {class: 'Druide', name: 'Equilibre', type: 'DpsDistance', canBRez: true, canBL: false, color:'#FF7D0A'},
    {class: 'Chasseur', name: 'Maîtrise des bêtes', type: 'DpsDistance', canBRez: false, canBL: false, color:'#ABD473'},
    {class: 'Chasseur', name: 'Précision', type: 'DpsDistance', canBRez: false, canBL: false, color:'#ABD473'},
    {class: 'Mage', name: 'Arcane', type: 'DpsDistance', canBRez: false, canBL: true, color:'#69CCF0'},
    {class: 'Mage', name: 'Feu', type: 'DpsDistance', canBRez: false, canBL: true, color:'#69CCF0'},
    {class: 'Mage', name: 'Givre', type: 'DpsDistance', canBRez: false, canBL: true, color:'#69CCF0'},
    {class: 'Chaman', name: 'Elementaire', type: 'DpsDistance', canBRez: false, canBL: true, color:'#0070DE'},
    {class: 'Démoniste', name: 'Afflication', type: 'DpsDistance', canBRez: true, canBL: false, color:'#9482C9'},
    {class: 'Démoniste', name: 'Démonologie', type: 'DpsDistance', canBRez: true, canBL: false, color:'#9482C9'},
    {class: 'Démoniste', name: 'Destruction', type: 'DpsDistance', canBRez: true, canBL: false, color:'#9482C9'},
    {class: 'Prêtre', name: 'Ombre', type: 'DpsDistance', canBRez: false, canBL: false, color:'#FFFFFF'},
  ];

  melees: ISpec[] = [
    {class: 'Chevalier de la mort', name: 'Givre', type: 'DpsCac', canBRez: true, canBL: false, color:'#C41F3B'},
    {class: 'Chevalier de la mort', name: 'Impie', type: 'DpsCac', canBRez: true, canBL: false, color:'#C41F3B'},
    {class: 'Druide', name: 'Farouche', type: 'DpsCac', canBRez: true, canBL: false, color:'#FF7D0A'},
    {class: 'Moine', name: 'Marche-vent', type: 'DpsCac', canBRez: false, canBL: false, color:'#00FF96'},
    {class: 'Paladin', name: 'Rétribution', type: 'DpsCac', canBRez: false, canBL: false, color:'#F58CBA'},
    {class: 'Voleur', name: 'Assasinat', type: 'DpsCac', canBRez: false, canBL: false, color:'#FFF569'},
    {class: 'Voleur', name: 'Hors la loi', type: 'DpsCac', canBRez: false, canBL: false, color:'#FFF569'},
    {class: 'Voleur', name: 'Finesse', type: 'DpsCac', canBRez: false, canBL: false, color:'#FFF569'},
    {class: 'Chasseur', name: 'Survie', type: 'DpsCac', canBRez: false, canBL: false, color:'#ABD473'},
    {class: 'Chaman', name: 'Amélioration', type: 'DpsCac', canBRez: false, canBL: true, color:'#0070DE'},
    {class: 'Guerrier', name: 'Armes', type: 'DpsCac', canBRez: false, canBL: false, color:'#C79C6E'},
    {class: 'Guerrier', name: 'Fureur', type: 'DpsCac', canBRez: false, canBL: false, color:'#C79C6E'},
    {class: 'Chasseur de démons', name: 'Dévastation', type: 'DpsCac', canBRez: false, canBL: false, color:'#A330C9'},
  ];


  players = null;
}
