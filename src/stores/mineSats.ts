import { times } from "lodash-es";
import { TROJAN_OMEGAS, TrojanKind } from "../components/Trojan";
import {
  mu_mars,
  mu_sun,
  N,
  r_harbor,
  r_jupiter,
  r_mars,
} from "../util/constants";
import { SIMULATION_SPEED, timer } from "../util/timer";

// const TROJAN_STD_DEV = Math.PI * 2 ** -5;
const TROJAN_STD_DEV = Math.PI * 2 ** -10;

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
    if (mineSat.expiry > event.data) continue;

    let v_infinity = 0;

    switch (mineSat.state) {
      case MineSatState.Depositing: {
        const trojan = Math.random() > 0.5 ? TrojanKind.Blue : TrojanKind.Red;
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 =
          Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        const omega_target = z0 * TROJAN_STD_DEV + TROJAN_OMEGAS[trojan];
        const omega_trojan = 0;

        const n_current = (mu_sun / r_mars ** 3) ** 0.5;
        const n_target = (mu_sun / r_jupiter ** 3) ** 0.5;

        const a_transfer = (r_mars + r_jupiter) / 2;
        const t_transfer = Math.PI * (a_transfer ** 3 / mu_sun) ** 0.5;

        const delta_theta_required =
          (Math.PI - omega_target + n_target * t_transfer) % (2 * Math.PI);
        const delta_theta_current =
          (omega_target - omega_trojan) % (2 * Math.PI);

        const t_remaining =
          (2 * t_transfer +
            (delta_theta_current - delta_theta_required) /
              (n_current - n_target)) %
          (2 * t_transfer);

        mineSat.state = MineSatState.AwaitingTrojan;
        mineSat.expiry += t_remaining;

        break;
      }

      case MineSatState.AwaitingTrojan: {
        v_infinity = 3;

        const a = -mu_mars / v_infinity ** 2;
        const e = 1 - r_harbor / a;

        mineSat.a = a;
        mineSat.e = e;

        SIMULATION_SPEED.value = 2 ** 11;
        mineSat.state = MineSatState.HyperbolicEscape;
        mineSat.t0 = event.data;
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
