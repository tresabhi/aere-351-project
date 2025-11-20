import { mu_S, r_J } from "../../util/constants";
import { Satellite } from "../Satellite";
import "./index.css";

export enum TrojanKind {
  Blue,
  Red,
}

const COLORS = {
  [TrojanKind.Blue]: "https://i.imgur.com/ArXRuko.png",
  [TrojanKind.Red]: "https://i.imgur.com/644NpfL.png",
};
export const TROJAN_OMEGAS = {
  [TrojanKind.Blue]: Math.PI / 3,
  [TrojanKind.Red]: -Math.PI / 3,
};

interface Props {
  color: TrojanKind;
}

export function Trojan({ color }: Props) {
  return (
    <Satellite rotate a={r_J} e={0} mu={mu_S} omega={TROJAN_OMEGAS[color]}>
      <img className="trojan" src={COLORS[color]} />
    </Satellite>
  );
}
