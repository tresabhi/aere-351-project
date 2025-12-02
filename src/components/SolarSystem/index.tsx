import { times } from "lodash-es";
import { Host, SimulationContext } from "../../contexts/Simulation";
import { mu_sun, N, r_jupiter, r_mars } from "../../util/constants";
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
    <SimulationContext
      value={{ scale0: 2.5 * r_jupiter, mu: mu_sun, host: Host.Sun }}
    >
      <div className="system">
        <Orbit r={r_mars} />
        <Orbit r={r_jupiter} />

        {times(N, (index) => (
          <MineSat key={index} index={index} />
        ))}

        <Sun />
        <Mars />
        <Jupiter />

        <Trojan color={TrojanKind.Blue} />
        <Trojan color={TrojanKind.Red} />

        <Label>SOLAR SYSTEM</Label>
      </div>
    </SimulationContext>
  );
}
