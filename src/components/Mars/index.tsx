import { mu_S, r_M } from "../../util/constants";
import { Satellite } from "../Satellite";
import "./index.css";

export function Mars() {
  return (
    <Satellite a={r_M} e={0} mu={mu_S}>
      <div className="mars" />
    </Satellite>
  );
}
