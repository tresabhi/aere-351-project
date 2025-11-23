import { times } from "lodash-es";
import { TROJAN_OMEGAS, TrojanKind } from "../components/Trojan";
import {
  mu_mars,
  N,
  n_jupiter,
  n_mars,
  r_harbor,
  T_synodic,
  T_transfer,
} from "../util/constants";
import { timer } from "../util/timer";

// const TROJAN_STD_DEV = Math.PI * 2 ** -5;
const TROJAN_STANDARD_DEVIATION = Math.PI * 2 ** -10;

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

  t0: number;
  a: number;
  e: number;
  omega: number;

  callbacks: (() => void)[];
};

export const mineSats: MineSat[] = times(N, () => ({
  state: MineSatState.Depositing,
  expiry: 0,

  t0: 0,
  a: r_harbor,
  e: 0,
  omega: 0,

  callbacks: [],
}));

timer.on((event) => {
  for (const mineSat of mineSats) {
    const t = event.data;

    if (mineSat.expiry > t) continue;

    let v_infinity = 0;

    switch (mineSat.state) {
      case MineSatState.Depositing: {
        const trojan = Math.random() > 0.5 ? TrojanKind.Blue : TrojanKind.Red;

        const u1 = Math.random();
        const u2 = Math.random();
        const z0 =
          Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

        const omega = z0 * TROJAN_STANDARD_DEVIATION + TROJAN_OMEGAS[trojan];

        const t_0 =
          ((1 / 2) * n_jupiter * T_transfer - omega - Math.PI) /
          (n_mars - n_jupiter);
        const t_next = T_synodic * Math.ceil((t - t_0) / T_synodic) + t_0;

        mineSat.state = MineSatState.AwaitingTrojan;
        mineSat.expiry = t_next;

        break;
      }

      case MineSatState.AwaitingTrojan: {
        v_infinity = 3;

        const a = -mu_mars / v_infinity ** 2;
        const e = 1 - r_harbor / a;

        mineSat.a = a;
        mineSat.e = e;

        // SIMULATION_SPEED.value = 2 ** 11;
        mineSat.state = MineSatState.HyperbolicEscape;
        mineSat.t0 = mineSat.expiry;
        mineSat.expiry = Infinity;

        break;
      }
    }

    for (const callback of mineSat.callbacks) callback();
  }
});

// if (event.data > stateExpiring.current) {
//   switch (state) {
//     case MineSatState.Depositing: {
//       const trojan =
//         Math.random() > 0.5 ? TrojanKind.Blue : TrojanKind.Red;
//       const u1 = Math.random();
//       const u2 = Math.random();
//       const z0 =
//         Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
//       const omega = z0 * TROJAN_STD_DEV + TROJAN_OMEGAS[trojan];
//       setOmega(omega);
//       setA(r_J);
//       setState(MineSatState.AwaitingTrojan);
//       stateExpiring.current = Infinity;
//     }
//   }
// }
