import { SimulationScaleContext } from "../../contexts/SimulationScale";
import { r_M } from "../../util/constants";
import { Label } from "../Label";
import { MarsStatic } from "../MarsStatic";
import { Orbit } from "../Orbit";
import "./index.css";

export function MartianSystem() {
  return (
    <SimulationScaleContext value={2.5 * r_M}>
      <div className="martian-system root-panel">
        <Label>MARTIAN SYSTEM</Label>

        <MarsStatic />
        <Orbit r={r_M} />
      </div>
    </SimulationScaleContext>
  );
}
