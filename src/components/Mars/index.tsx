import { r_M } from "../../util/constants";
import { Satellite } from "../Satellite";
import "./index.css";

export function Mars() {
  return (
    <Satellite a={r_M} e={0}>
      <div className="mars" />
    </Satellite>
  );
}
