import { SOLAR_SYSTEM_SIZE } from "../../util/constants";
import "./index.css";

interface Props {
  r: number;
}

export function Orbit({ r }: Props) {
  const size = (2 * r * 100) / SOLAR_SYSTEM_SIZE;

  return (
    <div className="orbit" style={{ width: `${size}%`, height: `${size}%` }} />
  );
}
