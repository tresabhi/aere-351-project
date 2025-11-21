import { times } from "lodash-es";
import { Host, SimulationContext } from "../../contexts/Simulation";
import { mu_mars, N, r_harbor } from "../../util/constants";
import { Harbor } from "../Harbor";
import { Label } from "../Label";
import { MarsStatic } from "../MarsStatic";
import { MineSat } from "../MineSat";
import { Orbit } from "../Orbit";
import "./index.css";

export function MartianSystem() {
  return (
    <SimulationContext
      value={{ scale: 5 * r_harbor, mu: mu_mars, host: Host.Mars }}
    >
      <div className="martian-system root-panel">
        <Label>MARTIAN SYSTEM</Label>

        <Orbit r={r_harbor} />

        <Harbor />

        {times(N, (index) => (
          <MineSat key={index} index={index} />
        ))}

        <MarsStatic />
      </div>
    </SimulationContext>
  );
}
