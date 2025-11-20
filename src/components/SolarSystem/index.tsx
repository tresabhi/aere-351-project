import { r_J, r_M } from "../../util/constants";
import { Jupiter } from "../Jupiter";
import { Label } from "../Label";
import { Mars } from "../Mars";
import { Orbit } from "../Orbit";
import { Sun } from "../Sun";
import "./index.css";

export function SolarSystem() {
  return (
    <div className="solar-system root-panel">
      <Label>SOLAR SYSTEM</Label>

      <Orbit r={r_M} />
      <Orbit r={r_J} />

      <Sun />
      <Mars />
      <Jupiter />
    </div>
  );
}
