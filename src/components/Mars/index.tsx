import { r_mars } from "../../util/constants";
import { Satellite } from "../Satellite";
import "./index.css";

export function Mars() {
  return (
    <Satellite a={r_mars} e={0}>
      <div className="mars" />
    </Satellite>
  );
}
