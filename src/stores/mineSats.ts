import { times } from "lodash-es";
import { N } from "../util/constants";

export enum MineSatState {
  Depositing,
  AwaitingTrojan,
  HyperbolicEscape,
  EllipticalEscape,
  MiningTrojan,
  AwaitingMars,
  EllipticalReturn,
  HyperbolicReturn,
  Parked,
  Phasing,
}

export enum MineSatRelative {
  Sun,
  Mars,
}

type MineSat = {
  state: MineSatState;
  expiry: number;

  relative: MineSatRelative;
  a: number;
  e: number;
  omega: number;
};

export const mineSats: MineSat[] = times(N, () => ({
  state: MineSatState.Depositing,
  expiry: 0,

  relative: MineSatRelative.Mars,
  a: 0,
  e: 0,
  omega: 0,
}));
