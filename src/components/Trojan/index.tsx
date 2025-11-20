import { mu_S, r_J } from "../../util/constants";
import { Satellite } from "../Satellite";
import "./index.css";

export enum TrojanColor {
  Blue,
  Red,
}

const colors = {
  [TrojanColor.Blue]: "https://i.imgur.com/ArXRuko.png",
  [TrojanColor.Red]: "https://i.imgur.com/644NpfL.png",
};
const omegas = {
  [TrojanColor.Blue]: Math.PI / 3,
  [TrojanColor.Red]: -Math.PI / 3,
};

interface Props {
  color: TrojanColor;
}

export function Trojan({ color }: Props) {
  return (
    <Satellite rotate a={r_J} e={0} mu={mu_S} omega={omegas[color]}>
      <img className="trojan" src={colors[color]} />
    </Satellite>
  );
}
