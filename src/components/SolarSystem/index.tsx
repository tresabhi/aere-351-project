import { mu_S, r_J, r_M } from "../../util/constants";
import { Jupiter } from "../Jupiter";
import { Label } from "../Label";
import { Mars } from "../Mars";
import { Orbit } from "../Orbit";
import { Satellite } from "../Satellite";
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

      <Satellite a={r_J} e={0} mu={mu_S} omega={Math.PI / 3}>
        <img
          style={{ width: "8rem", height: "8rem" }}
          src="https://preview.redd.it/morgan-freeman-true-3700-x-3700-v0-qz4le6i347391.png?width=640&crop=smart&auto=webp&s=067641ac9ba07bcd41563c307d2d19bc7deedbf8"
        />
      </Satellite>

      <Satellite a={r_J} e={0} mu={mu_S} omega={-Math.PI / 3}>
        <img
          style={{ width: "8rem", height: "8rem" }}
          src="https://preview.redd.it/morgan-freeman-true-3700-x-3700-v0-qz4le6i347391.png?width=640&crop=smart&auto=webp&s=067641ac9ba07bcd41563c307d2d19bc7deedbf8"
        />
      </Satellite>
    </div>
  );
}
