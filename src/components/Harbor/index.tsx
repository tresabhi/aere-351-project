import { r_harbor } from "../../util/constants";
import { Satellite } from "../Satellite";
import "./index.css";

export function Harbor() {
  return (
    <Satellite a={r_harbor} e={0}>
      <div className="harbor" />
    </Satellite>
  );
}
