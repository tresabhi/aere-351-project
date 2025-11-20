import { times } from "lodash-es";
import { N, r_J, r_M } from "../../util/constants";
import { Jupiter } from "../Jupiter";
import { Label } from "../Label";
import { Mars } from "../Mars";
import { MineSat } from "../MineSat";
import { Orbit } from "../Orbit";
import { Sun } from "../Sun";
import { Trojan, TrojanColor } from "../Trojan";
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

      <Trojan color={TrojanColor.Blue} />
      <Trojan color={TrojanColor.Red} />

      {times(N, (index) => (
        <MineSat key={index} />
      ))}
    </div>
  );
}
