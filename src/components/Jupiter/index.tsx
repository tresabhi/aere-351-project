import { r_jupiter } from "../../util/constants";
import { Satellite } from "../Satellite";
import "./index.css";

export function Jupiter() {
  return (
    <Satellite a={r_jupiter} e={0}>
      <div className="jupiter" />
    </Satellite>
  );
}
