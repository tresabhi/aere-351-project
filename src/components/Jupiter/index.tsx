import { mu_S, r_J } from "../../util/constants";
import { Satellite } from "../Satellite";
import "./index.css";

export function Jupiter() {
  return (
    <Satellite a={r_J} e={0} mu={mu_S}>
      <div className="jupiter" />
    </Satellite>
  );
}
