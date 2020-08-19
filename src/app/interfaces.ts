
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
