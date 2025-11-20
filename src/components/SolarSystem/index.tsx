import { times } from "lodash-es";
import { SimulationScaleContext } from "../../contexts/SimulationScale";
import { N, r_J, r_M } from "../../util/constants";
import { Jupiter } from "../Jupiter";
import { Label } from "../Label";
import { Mars } from "../Mars";
import { MineSat } from "../MineSat";
import { Orbit } from "../Orbit";
import { Sun } from "../Sun";
import { Trojan, TrojanKind } from "../Trojan";
import "./index.css";

export function SolarSystem() {
  return (
    <SimulationScaleContext value={2.5 * r_J}>
      <div className="solar-system root-panel">
        <Orbit r={r_M} />
        <Orbit r={r_J} />

        {times(N, (index) => (
          <MineSat key={index} />
        ))}

        <Sun />
        <Mars />
        <Jupiter />

        <Trojan color={TrojanKind.Blue} />
        <Trojan color={TrojanKind.Red} />

        <Label>SOLAR SYSTEM</Label>
      </div>
    </SimulationScaleContext>
  );
}
