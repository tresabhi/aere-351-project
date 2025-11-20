import type { QuicklimeEvent } from "quicklime";
import { useEffect, useRef, useState } from "react";
import { mu_S, r_J, r_M } from "../../util/constants";
import { timer } from "../../util/timer";
import { Satellite } from "../Satellite";
import { TROJAN_OMEGAS, TrojanKind } from "../Trojan";
import "./index.css";

const TROJAN_STD_DEV = Math.PI * 2 ** -5;

function Representation() {
  return <div className="mine-sat" />;
}

enum MineSatState {
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

export function MineSat() {
  const [state, setState] = useState(MineSatState.Depositing);
  const [a, setA] = useState(r_M);
  const [e, setE] = useState(0);
  const [omega, setOmega] = useState(Math.random() * 2 * Math.PI);

  const stateExpiring = useRef(0);

  useEffect(() => {
    function update(event: QuicklimeEvent<number>) {
      if (event.data > stateExpiring.current) {
        switch (state) {
          case MineSatState.Depositing: {
            const trojan =
              Math.random() > 0.5 ? TrojanKind.Blue : TrojanKind.Red;

            const u1 = Math.random();
            const u2 = Math.random();
            const z0 =
              Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
            const omega = z0 * TROJAN_STD_DEV + TROJAN_OMEGAS[trojan];

            setOmega(omega);
            setA(r_J);
            setState(MineSatState.AwaitingTrojan);

            stateExpiring.current = Infinity;
          }
        }
      }
    }

    timer.on(update);

    return () => {
      timer.off(update);
    };
  }, []);

  return (
    <Satellite a={a} e={e} mu={mu_S} omega={omega}>
      <Representation />
    </Satellite>
  );
}
