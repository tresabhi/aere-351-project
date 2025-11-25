import { times } from "lodash-es";
import { TROJAN_OMEGAS, TrojanKind } from "../components/Trojan";
import {
  N,
  n_jupiter,
  n_mars,
  r_harbor,
  r_jupiter,
  r_mars,
  T_synodic,
  T_transfer,
} from "../util/constants";
import { timer } from "../util/timer";

const TROJAN_STANDARD_DEVIATION = Math.PI * 2 ** -5;
// const TROJAN_STANDARD_DEVIATION = Math.PI * 2 ** -10;

const MINING_TIME_AVERAGE = 12 * 30 * 24 * 60 * 60;
const MINING_TIME_VARIANCE = 8 * 30 * 24 * 60 * 60;

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

interface MineSatCache {
  omega_trojan: number;
}

const cache: MineSatCache[] = times(N, () => ({
  omega_trojan: 0,
}));

timer.on((event) => {
  for (let i = 0; i < N; i++) {
    const mineSat = mineSats[i];
    const t = event.data; // TODO: replace all instances of t with mineSat.expiry

    if (mineSat.expiry > t) continue;

    switch (mineSat.state) {
      case MineSatState.Depositing: {
        const trojan = Math.random() > 0.5 ? TrojanKind.Blue : TrojanKind.Red;

        const u1 = Math.random();
        const u2 = Math.random();
        const z0 =
          Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

        const omega = z0 * TROJAN_STANDARD_DEVIATION + TROJAN_OMEGAS[trojan];

        const t_0 =
          ((1 / 2) * n_jupiter * T_transfer + omega - Math.PI) /
          (n_mars - n_jupiter);
        const t_next = T_synodic * Math.ceil((t - t_0) / T_synodic) + t_0;

        mineSat.omega = 0;

        mineSat.state = MineSatState.AwaitingTrojan;
        mineSat.expiry = t_next;

        cache[i].omega_trojan = omega;

        break;
      }

      case MineSatState.AwaitingTrojan: {
        const a = (r_jupiter + r_mars) / 2;
        const e = (r_jupiter - r_mars) / (r_jupiter + r_mars);

        const theta_mars = n_mars * mineSat.expiry;

        mineSat.a = a;
        mineSat.e = e;
        mineSat.omega = theta_mars;

        mineSat.t0 = mineSat.expiry;

        mineSat.state = MineSatState.EllipticalEscape;
        mineSat.expiry += T_transfer / 2;

        break;
      }

      case MineSatState.EllipticalEscape: {
        mineSat.a = r_jupiter;
        mineSat.e = 0;
        mineSat.omega = cache[i].omega_trojan;

        mineSat.t0 = 0;
        mineSat.state = MineSatState.MiningTrojan;
        mineSat.expiry +=
          MINING_TIME_AVERAGE + (2 * Math.random() - 1) * MINING_TIME_VARIANCE;

        break;
      }

      case MineSatState.MiningTrojan: {
        const omega = cache[i].omega_trojan;

        const t_0 =
          (omega - (1 / 2) * n_mars * T_transfer - Math.PI) /
          (n_mars - n_jupiter);
        const t_next = T_synodic * Math.ceil((t - t_0) / T_synodic) + t_0;

        mineSat.omega = 0;

        mineSat.state = MineSatState.AwaitingMars;
        mineSat.expiry = t_next;

        break;
      }

      case MineSatState.AwaitingMars: {
        const a = (r_jupiter + r_mars) / 2;
        const e = (r_jupiter - r_mars) / (r_jupiter + r_mars);

        const theta_juipiter = n_jupiter * mineSat.expiry;

        mineSat.a = a;
        mineSat.e = e;
        mineSat.omega = theta_juipiter + cache[i].omega_trojan - Math.PI;

        mineSat.t0 = mineSat.expiry - T_transfer / 2;

        mineSat.state = MineSatState.EllipticalReturn;
        mineSat.expiry += T_transfer / 2;

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
