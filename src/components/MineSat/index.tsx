import { useState } from "react";
import { mu_S, r_J, r_M } from "../../util/constants";
import { Satellite } from "../Satellite";
import "./index.css";

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
  const [state, setState] = useState(MineSatState.AwaitingTrojan);

  return (
    <Satellite
      a={(r_J - r_M) * Math.random() + r_M}
      e={Math.random() * 0.75}
      mu={mu_S}
      omega={Math.random() * 2 * Math.PI}
    >
      <Representation />
    </Satellite>
  );
}
