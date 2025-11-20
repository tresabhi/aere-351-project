import { r_J } from "../../util/constants";
import { Satellite } from "../Satellite";
import "./index.css";

export function Jupiter() {
  return (
    <Satellite a={r_J} e={0}>
      <div className="jupiter" />
    </Satellite>
  );
}
