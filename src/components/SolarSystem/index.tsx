import { times } from "lodash-es";
import { Host, SimulationContext } from "../../contexts/Simulation";
import { mu_S, N, r_J, r_M } from "../../util/constants";
import { Jupiter } from "../Jupiter";
import { Label } from "../Label";
import { MineSat } from "../MineSat";
import { Orbit } from "../Orbit";
import { Sun } from "../Sun";
import { Trojan, TrojanKind } from "../Trojan";
import "./index.css";

export function SolarSystem() {
  return (
    <SimulationContext value={{ scale: 2.5 * r_J, mu: mu_S, host: Host.Sun }}>
      <div className="solar-system root-panel">
        <Orbit r={r_M} />
        <Orbit r={r_J} />

        {times(N, (index) => (
          <MineSat key={index} index={index} />
        ))}

        <Sun />
        {/* <Mars /> */}
        <Jupiter />

        <Trojan color={TrojanKind.Blue} />
        <Trojan color={TrojanKind.Red} />

        <Label>SOLAR SYSTEM</Label>
      </div>
    </SimulationContext>
  );
}
