import {ISpec} from './interfaces';

export const tanks: ISpec[] = [
  {class: 'Chevalier de la mort', name: 'Sang', type: 'Tank', canBRez: true, canBL: false, color:'#C41F3B'},
  {class: 'Moine', name: 'Maître Brasseur', type: 'Tank', canBRez: false, canBL: false, color:'#00FF96'},
  {class: 'Guerrier', name: 'Protection', type: 'Tank', canBRez: false, canBL: false, color:'#C79C6E'},
  {class: 'Druide', name: 'Gardien', type: 'Tank', canBRez: true, canBL: false, color:'#FF7D0A'},
  {class: 'Chasseur de démons', name: 'Vengeance', type: 'Tank', canBRez: false, canBL: false, color:'#A330C9'},
  {class: 'Paladin', name: 'Protection', type: 'Tank', canBRez: false, canBL: false, color:'#F58CBA'}
];

export const heals: ISpec[] = [
  {class: 'Paladin', name: 'Sacré', type: 'Heal', canBRez: false, canBL: false, color:'#F58CBA'},
  {class: 'Prêtre', name: 'Sacré', type: 'Heal', canBRez: false, canBL: false, color:'#FFFFFF'},
  {class: 'Prêtre', name: 'Discipline', type: 'Heal', canBRez: false, canBL: false, color:'#FFFFFF'},
  {class: 'Druide', name: 'Restauration', type: 'Heal', canBRez: true, canBL: false, color:'#FF7D0A'},
  {class: 'Chaman', name: 'Restauration', type: 'Heal', canBRez: false, canBL: true, color:'#0070DE'},
  {class: 'Moine', name: 'Tisse-brume', type: 'Heal', canBRez: false, canBL: false, color:'#00FF96'}
];

export const ranges: ISpec[] = [
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

export const melees: ISpec[] = [
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
