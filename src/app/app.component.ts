import {ChangeDetectorRef, Component} from '@angular/core';
import {IDPSConfig, IPlayer, IResult, ISpec} from './interfaces';
import {
  heals as healsListData,
  tanks as tanksListData,
  ranges as rangesListData,
  melees as meleesListData
} from './data';

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
  teamsCount: number = 10;
  maxClassPrct: number = 50;
  maxCountPerClasses: number = 5;
  tankSelectedForMaxCountRule : { [className : string] : number } = {};
  healSelectedForMaxCountRule : { [className : string] : number } = {};

  forbidenPlayerClassCombos: string[] = [
    'Damian/Chasseurdedemons/Vengeance',
    'Damian/Chasseurdedemons/Dévastation',
    'Nicolas/Guerrier/Armes',
    'Nicolas/Guerrier/Fureur',
    'Julien/Voleur/Assasinat',
    'Julien/Voleur/Horslaloi',
    'Julien/Voleur/Finesse'
  ];
  forbidenPlayerRoleCombos: string[] = [''];

  report = {
    Damian: {tank: 0, dpsCac: 0, dpsDistance: 0, heal: 0},
    Hugo: {tank: 0, dpsCac: 0, dpsDistance: 0, heal: 0},
    Nicolas: {tank: 0, dpsCac: 0, dpsDistance: 0, heal: 0},
    Julien: {tank: 0, dpsCac: 0, dpsDistance: 0, heal: 0},
    Pierre: {tank: 0, dpsCac: 0, dpsDistance: 0, heal: 0},
  };

  constructor(
    private cd: ChangeDetectorRef,
  ) {
  }

  setTeamsCount(event){
    this.teamsCount = event.target.value;
  }

  setMaxClassPrct(event){
    if(event.target.value >= 30){
      this.maxClassPrct = event.target.value;
    } else {
      this.maxClassPrct = 30;
    }

    (<HTMLInputElement>document.getElementById("maxClassPrctValue")).value = ''+this.maxClassPrct;
  }

  defaultTeam() {
    this.virginPlayers = [
      {name: 'Damian', selected: false},
      {name: 'Hugo', selected: false},
      {name: 'Pierre', selected: false},
      {name: 'Julien', selected: false},
      {name: 'Nicolas', selected: false},
    ]
  }

  removePlayer(){
    if(this.virginPlayers.length == 0){
      return;
    }
    this.virginPlayers.pop()
  }

  addPlayer(){
    if(this.virginPlayers.length == 5){
      return;
    }
    this.virginPlayers.push({name : '',selected:false})
  }

  changeName(event,PlayerIndex){
    this.virginPlayers.map((played,index) => {
      if(index == PlayerIndex){
        played.name = event.target.value
      }
    })
  }

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
    console.log(this.virginPlayers);
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
    let x = this.teamsCount;

    this.maxCountPerClasses = this.teamsCount * this.maxClassPrct / 100;
    tanksListData.map(spec => {
      this.tankSelectedForMaxCountRule[spec.class] = 0;
    })

    healsListData.map(spec => {
      this.healSelectedForMaxCountRule[spec.class] = 0;
    })

    console.log('1',this.maxCountPerClasses);

    while (x > 0) {
      this.players = this.virginPlayers;
      this.players.map(el => el.selected = false);

      this.setupDpsConfiguration();


      let excludeClass: string[] = [];

      const tank: ISpec = this.getRandomValueFromObject(tanksListData, excludeClass);
      excludeClass.push(tank.class);

      const heal: ISpec = this.getRandomValueFromObject(healsListData, excludeClass);
      excludeClass.push(heal.class);

      const isDoubleRanged = this.setup.rangeCount > 1;
      const dps1: ISpec = this.getRandomValueFromObject(isDoubleRanged ? rangesListData : meleesListData, excludeClass);
      excludeClass.push(dps1.class);

      const dps2: ISpec = this.getRandomValueFromObject(isDoubleRanged ? meleesListData : rangesListData, excludeClass);
      excludeClass.push(dps2.class);

      const dps3: ISpec = this.getRandomValueFromObject(isDoubleRanged ? rangesListData : meleesListData, excludeClass);
      excludeClass.push(dps3.class);


      let result: IResult = {
        tank: {spec: tank, player: this.selectPlayer()},
        heal: {spec: heal, player: this.selectPlayer()},
        dps1: {spec: dps1, player: this.selectPlayer()},
        dps2: {spec: dps2, player: this.selectPlayer()},
        dps3: {spec: dps3, player: this.selectPlayer()},
      };

      if (this.isValidResult(result)) {
        this.tankSelectedForMaxCountRule[tank.class] += 1;
        this.healSelectedForMaxCountRule[heal.class] += 1;
        this.resultPoints[index] = 0;
        index++;
        this.results.push(result);
        x -= 1;
      } else {
        this.falseCompoCount += 1;
      }
    }

    console.log('report',this.makeReportFromResult(this.results));
  }

  isValidResult(result: IResult) {
    let selectedSpecs: ISpec[] = [];
    let playerClassList: string[] = [];
    let playerRoleList: string[] = [];
    let blCount: number = 0;
    let bRezCount: number = 0;
    let tankClass: string = '';
    let healClass: string = '';

    Object.keys(result).map(function (role) {
      let player: IPlayer = result[role].player;
      let spec: ISpec = result[role].spec;
      if(spec.type == 'Tank'){
        tankClass = spec.class;
      }
      if(spec.type == 'Heal'){
        healClass = spec.class;
      }
      selectedSpecs.push(spec);
      playerClassList.push(player.name + '/' + spec.class + '/' + spec.name);
      playerRoleList.push(player.name + '/' + role);
    });

    if(this.tankSelectedForMaxCountRule[tankClass] == this.maxCountPerClasses){
      return false;
    }

    if(this.healSelectedForMaxCountRule[healClass] == this.maxCountPerClasses){
      return false;
    }

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
    let newReport = [];

    for(let player of this.virginPlayers){
      newReport[player.name] =  {tank: 0, dpsCac: 0, dpsDistance: 0, heal: 0}
    }

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

  players = null;
}
