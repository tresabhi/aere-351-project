import { r_J, r_M } from "../../constants";
import { Label } from "../../Label";
import { Orbit } from "../../Orbit";
import { Sun } from "../Sun";
import "./index.css";

export function SolarSystem() {
  return (
    <div className="solar-system root-panel">
      <Label>SOLAR SYSTEM</Label>

      <Orbit r={r_M} />
      <Orbit r={r_J} />
      <Sun />
    </div>
  );
}
