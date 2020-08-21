import {ChangeDetectorRef, Component} from '@angular/core';
import {IDPSConfig, IPlayer, IResult, ISpec} from './interfaces';
import {
  heals as healsListData,
  tanks as tanksListData,
  ranges as rangesListData,
  melees as meleesListData,
  selectedForMaxCountRulePristin,
  dps as dpsListData
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
  resultPoints: { [index: number]: number } = {};
  players = null;

  falseCompoCount: number = 0;
  teamsCount: number = 10;
  maxClassPrct: number = 30;
  maxDpsClassPrct: number = 40;
  maxCountPerClasses: number = 5;
  maxDpsCountPerClasses: number = 5;
  tankSelectedForMaxCountRule: { [className: string]: number } = {};
  healSelectedForMaxCountRule: { [className: string]: number } = {};
  dpsSelectedForMaxCountRule: { [className: string]: number } = {};

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

  setTeamsCount(event) {
    this.teamsCount = event.target.value;
  }

  setMaxClassPrct(event) {
    this.maxClassPrct = event.target.value >= 30 ? event.target.value : 30;
    (<HTMLInputElement>document.getElementById('maxClassPrctValue')).value = '' + this.maxClassPrct;
  }

  setMaxDpsClassPrct(event) {
    this.maxDpsClassPrct = event.target.value >= 40 ? event.target.value : 40;
    (<HTMLInputElement>document.getElementById('maxDpsClassPrctValue')).value = '' + this.maxDpsClassPrct;
  }

  defaultTeam() {
    this.virginPlayers = [
      {name: 'Damian', selected: false},
      {name: 'Hugo', selected: false},
      {name: 'Pierre', selected: false},
      {name: 'Julien', selected: false},
      {name: 'Nicolas', selected: false},
    ];
  }

  removePlayer() {
    this.virginPlayers.length ? this.virginPlayers.pop() : '';
  }

  addPlayer() {
    this.virginPlayers.length == 5 ? '' : this.virginPlayers.push({name: '', selected: false});
  }

  changeName(event, PlayerIndex) {
    this.virginPlayers.map((played, index) => {
      if (index == PlayerIndex) {
        played.name = event.target.value;
      }
    });
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
    this.selectedFaction = this.factions[Math.floor(Math.random() * this.factions.length)];
  }

  addPoints(index: number, points: number) {
    this.resultPoints[index] += points;
  }

  isBestChoice(index: number) {
    let currentIndexCount = this.resultPoints[index];
    return currentIndexCount && Object.values(this.resultPoints).filter(value => {
      return currentIndexCount < value;
    }).length == 0;
  }

  resetPoints() {
    Object.keys(this.resultPoints).map(key => this.resultPoints[key] = 0);
  }

  generateResults() {
    console.log('START');
    let index = 0;
    this.falseCompoCount = 0;
    this.results = [];
    let x = this.teamsCount;

    this.maxCountPerClasses = this.teamsCount * this.maxClassPrct / 100;
    this.maxDpsCountPerClasses = this.teamsCount * this.maxDpsClassPrct / 100;

    this.tankSelectedForMaxCountRule = selectedForMaxCountRulePristin(tanksListData);
    this.healSelectedForMaxCountRule = selectedForMaxCountRulePristin(healsListData);
    this.dpsSelectedForMaxCountRule = selectedForMaxCountRulePristin(dpsListData);

    while (x > 0) {
      this.players = this.virginPlayers;
      this.players.map(el => el.selected = false);
      this.setupDpsConfiguration();
      let excludeClass: string[] = [];

      const tank: ISpec = this.getRandomSpec(tanksListData, excludeClass);
      excludeClass.push(tank.class);

      const heal: ISpec = this.getRandomSpec(healsListData, excludeClass);
      excludeClass.push(heal.class);

      const isDoubleRanged = this.setup.rangeCount > 1;
      const dps1: ISpec = this.getRandomSpec(isDoubleRanged ? rangesListData : meleesListData, excludeClass);
      excludeClass.push(dps1.class);

      const dps2: ISpec = this.getRandomSpec(isDoubleRanged ? meleesListData : rangesListData, excludeClass);
      excludeClass.push(dps2.class);

      const dps3: ISpec = this.getRandomSpec(isDoubleRanged ? rangesListData : meleesListData, excludeClass);
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
        this.dpsSelectedForMaxCountRule[dps1.class] += 1;
        this.dpsSelectedForMaxCountRule[dps2.class] += 1;
        this.dpsSelectedForMaxCountRule[dps3.class] += 1;
        this.resultPoints[index] = 0;
        index++;
        this.results.push(result);
        x -= 1;
      } else {
        this.falseCompoCount += 1;
      }
    }

    console.log('report', this.makeReportFromResult(this.results));
    console.log('STOP');
  }

  isValidResult(result: IResult) {
    let selectedSpecs: ISpec[] = [];
    let playerClassList: string[] = [];
    let playerRoleList: string[] = [];
    let blCount: number = 0;
    let bRezCount: number = 0;
    let tankClass: string = '';
    let healClass: string = '';
    let dpsClass: string[] = [];

    Object.keys(result).map(function (role) {
      let player: IPlayer = result[role].player;
      let spec: ISpec = result[role].spec;
      if (spec.type == 'Tank') {
        tankClass = spec.class;
      } else if (spec.type == 'Heal') {
        healClass = spec.class;
      } else {
        dpsClass.push(spec.class);
      }
      selectedSpecs.push(spec);
      playerClassList.push(player.name + '/' + spec.class + '/' + spec.name);
      playerRoleList.push(player.name + '/' + role);
    });

    if (this.tankSelectedForMaxCountRule[tankClass] == this.maxCountPerClasses) {
      return false;
    }

    if (this.healSelectedForMaxCountRule[healClass] == this.maxCountPerClasses) {
      return false;
    }

    let dpsOk = true;
    dpsClass.map(dpsClass => {
      if (this.dpsSelectedForMaxCountRule[dpsClass] == this.maxDpsCountPerClasses) {
        dpsOk = false;
      }
    });

    if (!dpsOk) {
      return false;
    }

    selectedSpecs.map(selectedSpec => {
      if (selectedSpec.canBL) {
        blCount += 1;
      }

      if (selectedSpec.canBRez) {
        bRezCount += 1;
      }
    });

    let validClases: boolean = bRezCount == blCount && bRezCount + blCount == 2;

    if (!validClases) {
      return false;
    }

    let playerClassFlag: boolean = false;
    playerClassList.map(playerClass => {
      if (this.forbidenPlayerClassCombos.includes(playerClass)) {
        playerClassFlag = true;
      }
    });

    let playerRoleFlag: boolean = false;
    playerRoleList.map(playerClass => {
      if (this.forbidenPlayerRoleCombos.includes(playerClass)) {
        playerRoleFlag = true;
      }
    });

    if (playerClassFlag || playerRoleFlag) {
      this.falseCompoCount += 1;
      return false;
    }

    return true;
  }

  makeReportFromResult(globalResult: any) {
    let newReport = [];
    let allSpecs = [];
    let allTanks = [];
    let allHeals = [];
    let allDpsCac = [];
    let allDpsDistance = [];

    this.virginPlayers.map(player => newReport[player.name] = {tank: 0, dpsCac: 0, dpsDistance: 0, heal: 0});

    globalResult.map(result => {
      Object.keys(result).map(key => {
        let specData: { spec: ISpec, player?: IPlayer } = result[key];
        allSpecs.push({type: specData.spec.type, name: specData.spec.name});

        switch (specData.spec.type) {
          case 'DpsCac':
            allDpsCac.push(specData.player.name);
            break;
          case 'DpsDistance':
            allDpsDistance.push(specData.player.name);
            break;
          case 'Heal':
            allHeals.push(result.heal.player.name);
            break;
          case 'Tank':
            allTanks.push(result.tank.player.name);
            break;
          default:
            break;
        }
      });
    });

    allTanks.map(el => newReport[el].tank += 1);
    allHeals.map(el => newReport[el].heal += 1);
    allDpsCac.map(el => newReport[el].dpsCac += 1);
    allDpsDistance.map(el => newReport[el].dpsDistance += 1);

    // this.getAllSpecStats(allSpecs);

    return newReport;
  }

  getAllSpecStats(allSpecs: ISpec[]) {
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

    console.log('test', test);
  }

  getRandomSpec(specs: ISpec[], excludeClass: string[] = []) {
    let specsToChoose = specs.filter(spec => !excludeClass.includes(spec.class));
    return specsToChoose[Math.floor(Math.random() * specsToChoose.length)];
  }

  selectPlayer() {
    let leftPlayers = this.players.filter(el => !el.selected);
    const playerchosen = leftPlayers[Math.floor(Math.random() * leftPlayers.length)];
    this.players.filter(el => el.name == playerchosen.name).map(el => el.selected = true);
    return playerchosen;
  }

}
