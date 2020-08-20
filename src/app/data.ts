import {ISpec} from './interfaces';

const specs : ISpec[] = [
  {class: 'dk', fullClassName : 'Chevalier de la mort', name: 'Sang', type: 'Tank', canBRez: true, canBL: false, color:'#C41F3B'},
  {class: 'dk', fullClassName : 'Chevalier de la mort', name: 'Givre', type: 'DpsCac', canBRez: true, canBL: false, color:'#C41F3B'},
  {class: 'dk', fullClassName : 'Chevalier de la mort', name: 'Impie', type: 'DpsCac', canBRez: true, canBL: false, color:'#C41F3B'},
  {class: 'war', fullClassName : 'Guerrier', name: 'Armes', type: 'DpsCac', canBRez: false, canBL: false, color:'#C79C6E'},
  {class: 'war', fullClassName : 'Guerrier', name: 'Fureur', type: 'DpsCac', canBRez: false, canBL: false, color:'#C79C6E'},
  {class: 'war', fullClassName : 'Guerrier', name: 'Protection', type: 'Tank', canBRez: false, canBL: false, color:'#C79C6E'},
  {class: 'drood', fullClassName : 'Druide', name: 'Gardien', type: 'Tank', canBRez: true, canBL: false, color:'#FF7D0A'},
  {class: 'drood', fullClassName : 'Druide', name: 'Equilibre', type: 'DpsDistance', canBRez: true, canBL: false, color:'#FF7D0A'},
  {class: 'drood', fullClassName : 'Druide', name: 'Restauration', type: 'Heal', canBRez: true, canBL: false, color:'#FF7D0A'},
  {class: 'drood', fullClassName : 'Druide', name: 'Farouche', type: 'DpsCac', canBRez: true, canBL: false, color:'#FF7D0A'},
  {class: 'pal', fullClassName : 'Paladin', name: 'Protection', type: 'Tank', canBRez: false, canBL: false, color:'#F58CBA'},
  {class: 'pal', fullClassName : 'Paladin', name: 'Sacré', type: 'Heal', canBRez: false, canBL: false, color:'#F58CBA'},
  {class: 'pal', fullClassName : 'Paladin', name: 'Rétribution', type: 'DpsCac', canBRez: false, canBL: false, color:'#F58CBA'},
  {class: 'pretre', fullClassName : 'Prêtre', name: 'Sacré', type: 'Heal', canBRez: false, canBL: false, color:'#FFFFFF'},
  {class: 'pretre', fullClassName : 'Prêtre', name: 'Discipline', type: 'Heal', canBRez: false, canBL: false, color:'#FFFFFF'},
  {class: 'pretre', fullClassName : 'Prêtre', name: 'Ombre', type: 'DpsDistance', canBRez: false, canBL: false, color:'#FFFFFF'},
  {class: 'cham', fullClassName : 'Chaman', name: 'Restauration', type: 'Heal', canBRez: false, canBL: true, color:'#0070DE'},
  {class: 'cham', fullClassName : 'Chaman', name: 'Amélioration', type: 'DpsCac', canBRez: false, canBL: true, color:'#0070DE'},
  {class: 'cham', fullClassName : 'Chaman', name: 'Elementaire', type: 'DpsDistance', canBRez: false, canBL: true, color:'#0070DE'},
  {class: 'monk', fullClassName : 'Moine', name: 'Tisse-brume', type: 'Heal', canBRez: false, canBL: false, color:'#00FF96'},
  {class: 'monk', fullClassName : 'Moine', name: 'MaîtreBrasseur', type: 'Tank', canBRez: false, canBL: false, color:'#00FF96'},
  {class: 'hunt', fullClassName : 'Chasseur', name: 'Maîtrisedesbêtes', type: 'DpsDistance', canBRez: false, canBL: false, color:'#ABD473'},
  {class: 'hunt', fullClassName : 'Chasseur', name: 'Précision', type: 'DpsDistance', canBRez: false, canBL: false, color:'#ABD473'},
  {class: 'hunt', fullClassName : 'Chasseur', name: 'Survie', type: 'DpsCac', canBRez: false, canBL: false, color:'#ABD473'},
  {class: 'mage', fullClassName : 'Mage', name: 'Arcane', type: 'DpsDistance', canBRez: false, canBL: true, color:'#69CCF0'},
  {class: 'mage', fullClassName : 'Mage', name: 'Feu', type: 'DpsDistance', canBRez: false, canBL: true, color:'#69CCF0'},
  {class: 'mage', fullClassName : 'Mage', name: 'Givre', type: 'DpsDistance', canBRez: false, canBL: true, color:'#69CCF0'},
  {class: 'demo', fullClassName : 'Démoniste', name: 'Afflication', type: 'DpsDistance', canBRez: true, canBL: false, color:'#9482C9'},
  {class: 'demo', fullClassName : 'Démoniste', name: 'Démonologie', type: 'DpsDistance', canBRez: true, canBL: false, color:'#9482C9'},
  {class: 'demo', fullClassName : 'Démoniste', name: 'Destruction', type: 'DpsDistance', canBRez: true, canBL: false, color:'#9482C9'},
  {class: 'monk', fullClassName : 'Moine', name: 'Marche-vent', type: 'DpsCac', canBRez: false, canBL: false, color:'#00FF96'},
  {class: 'voleur', fullClassName : 'Voleur', name: 'Assasinat', type: 'DpsCac', canBRez: false, canBL: false, color:'#FFF569'},
  {class: 'voleur', fullClassName : 'Voleur', name: 'Horslaloi', type: 'DpsCac', canBRez: false, canBL: false, color:'#FFF569'},
  {class: 'voleur', fullClassName : 'Voleur', name: 'Finesse', type: 'DpsCac', canBRez: false, canBL: false, color:'#FFF569'},
  {class: 'dh', fullClassName : 'Chasseur de démons', name: 'Vengeance', type: 'Tank', canBRez: false, canBL: false, color:'#A330C9'},
  {class: 'dh', fullClassName : 'Chasseur de démons', name: 'Dévastation', type: 'DpsCac', canBRez: false, canBL: false, color:'#A330C9'}
]

export const tanks = specs.filter(spec => spec.type == 'Tank');
export const heals = specs.filter(spec => spec.type == 'Heal');
export const dps = specs.filter(spec => (spec.type == 'DpsCac') || (spec.type == 'DpsDistance'));
export const melees = specs.filter(spec => spec.type == 'DpsCac');
export const ranges = specs.filter(spec => spec.type == 'DpsDistance');

export const selectedForMaxCountRulePristin = (specs : ISpec[]) : { [className: string]: number } => {
  let result : { [className: string]: number } = {};
  specs.map(spec => result[spec.class] = 0)
  return result;
}

//
// export const tanks: ISpec[] = [
//   {class: 'dk', fullClassName : 'Chevalier de la mort', name: 'Sang', type: 'Tank', canBRez: true, canBL: false, color:'#C41F3B'},
//   {class: 'monk', fullClassName : 'Moine', name: 'MaîtreBrasseur', type: 'Tank', canBRez: false, canBL: false, color:'#00FF96'},
//   {class: 'war', fullClassName : 'Guerrier', name: 'Protection', type: 'Tank', canBRez: false, canBL: false, color:'#C79C6E'},
//   {class: 'drood', fullClassName : 'Druide', name: 'Gardien', type: 'Tank', canBRez: true, canBL: false, color:'#FF7D0A'},
//   {class: 'dh', fullClassName : 'Chasseur de démons', name: 'Vengeance', type: 'Tank', canBRez: false, canBL: false, color:'#A330C9'},
//   {class: 'pal', fullClassName : 'Paladin', name: 'Protection', type: 'Tank', canBRez: false, canBL: false, color:'#F58CBA'}
// ];
//
// export const heals: ISpec[] = [
//   {class: 'pal', fullClassName : 'Paladin', name: 'Sacré', type: 'Heal', canBRez: false, canBL: false, color:'#F58CBA'},
//   {class: 'pretre', fullClassName : 'Prêtre', name: 'Sacré', type: 'Heal', canBRez: false, canBL: false, color:'#FFFFFF'},
//   {class: 'pretre', fullClassName : 'Prêtre', name: 'Discipline', type: 'Heal', canBRez: false, canBL: false, color:'#FFFFFF'},
//   {class: 'drood', fullClassName : 'Druide', name: 'Restauration', type: 'Heal', canBRez: true, canBL: false, color:'#FF7D0A'},
//   {class: 'cham', fullClassName : 'Chaman', name: 'Restauration', type: 'Heal', canBRez: false, canBL: true, color:'#0070DE'},
//   {class: 'monk', fullClassName : 'Moine', name: 'Tisse-brume', type: 'Heal', canBRez: false, canBL: false, color:'#00FF96'}
// ];
//
// export const ranges: ISpec[] = [
//   {class: 'drood', fullClassName : 'Druide', name: 'Equilibre', type: 'DpsDistance', canBRez: true, canBL: false, color:'#FF7D0A'},
//   {class: 'hunt', fullClassName : 'Chasseur', name: 'Maîtrisedesbêtes', type: 'DpsDistance', canBRez: false, canBL: false, color:'#ABD473'},
//   {class: 'hunt', fullClassName : 'Chasseur', name: 'Précision', type: 'DpsDistance', canBRez: false, canBL: false, color:'#ABD473'},
//   {class: 'mage', fullClassName : 'Mage', name: 'Arcane', type: 'DpsDistance', canBRez: false, canBL: true, color:'#69CCF0'},
//   {class: 'mage', fullClassName : 'Mage', name: 'Feu', type: 'DpsDistance', canBRez: false, canBL: true, color:'#69CCF0'},
//   {class: 'mage', fullClassName : 'Mage', name: 'Givre', type: 'DpsDistance', canBRez: false, canBL: true, color:'#69CCF0'},
//   {class: 'cham', fullClassName : 'Chaman', name: 'Elementaire', type: 'DpsDistance', canBRez: false, canBL: true, color:'#0070DE'},
//   {class: 'demo', fullClassName : 'Démoniste', name: 'Afflication', type: 'DpsDistance', canBRez: true, canBL: false, color:'#9482C9'},
//   {class: 'demo', fullClassName : 'Démoniste', name: 'Démonologie', type: 'DpsDistance', canBRez: true, canBL: false, color:'#9482C9'},
//   {class: 'demo', fullClassName : 'Démoniste', name: 'Destruction', type: 'DpsDistance', canBRez: true, canBL: false, color:'#9482C9'},
//   {class: 'pretre', fullClassName : 'Prêtre', name: 'Ombre', type: 'DpsDistance', canBRez: false, canBL: false, color:'#FFFFFF'},
// ];
//
// export const melees: ISpec[] = [
//   {class: 'dk', fullClassName : 'Chevalier de la mort', name: 'Givre', type: 'DpsCac', canBRez: true, canBL: false, color:'#C41F3B'},
//   {class: 'dk', fullClassName : 'Chevalier de la mort', name: 'Impie', type: 'DpsCac', canBRez: true, canBL: false, color:'#C41F3B'},
//   {class: 'drood', fullClassName : 'Druide', name: 'Farouche', type: 'DpsCac', canBRez: true, canBL: false, color:'#FF7D0A'},
//   {class: 'monk', fullClassName : 'Moine', name: 'Marche-vent', type: 'DpsCac', canBRez: false, canBL: false, color:'#00FF96'},
//   {class: 'pal', fullClassName : 'Paladin', name: 'Rétribution', type: 'DpsCac', canBRez: false, canBL: false, color:'#F58CBA'},
//   {class: 'voleur', fullClassName : 'Voleur', name: 'Assasinat', type: 'DpsCac', canBRez: false, canBL: false, color:'#FFF569'},
//   {class: 'voleur', fullClassName : 'Voleur', name: 'Horslaloi', type: 'DpsCac', canBRez: false, canBL: false, color:'#FFF569'},
//   {class: 'voleur', fullClassName : 'Voleur', name: 'Finesse', type: 'DpsCac', canBRez: false, canBL: false, color:'#FFF569'},
//   {class: 'hunt', fullClassName : 'Chasseur', name: 'Survie', type: 'DpsCac', canBRez: false, canBL: false, color:'#ABD473'},
//   {class: 'cham', fullClassName : 'Chaman', name: 'Amélioration', type: 'DpsCac', canBRez: false, canBL: true, color:'#0070DE'},
//   {class: 'war', fullClassName : 'Guerrier', name: 'Armes', type: 'DpsCac', canBRez: false, canBL: false, color:'#C79C6E'},
//   {class: 'war', fullClassName : 'Guerrier', name: 'Fureur', type: 'DpsCac', canBRez: false, canBL: false, color:'#C79C6E'},
//   {class: 'dh', fullClassName : 'Chasseur de démons', name: 'Dévastation', type: 'DpsCac', canBRez: false, canBL: false, color:'#A330C9'},
// ];
