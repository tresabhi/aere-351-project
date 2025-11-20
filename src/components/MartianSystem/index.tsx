import { times } from "lodash-es";
import { Host, SimulationContext } from "../../contexts/Simulation";
import { mu_M, N, r_M } from "../../util/constants";
import { Label } from "../Label";
import { MarsStatic } from "../MarsStatic";
import { MineSat } from "../MineSat";
import { Orbit } from "../Orbit";
import "./index.css";

export function MartianSystem() {
  return (
    <SimulationContext value={{ scale: 2.5 * r_M, mu: mu_M, host: Host.Mars }}>
      <div className="martian-system root-panel">
        <Label>MARTIAN SYSTEM</Label>

        <Orbit r={r_M} />

        {times(N, (index) => (
          <MineSat key={index} index={index} />
        ))}

        <MarsStatic />
      </div>
    </SimulationContext>
  );
}
