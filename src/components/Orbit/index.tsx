import { useContext } from "react";
import { SimulationContext } from "../../contexts/Simulation";
import "./index.css";

interface Props {
  r: number;
}

export function Orbit({ r }: Props) {
  const { scale } = useContext(SimulationContext);
  const size = (2 * r * 100) / scale;

  return (
    <div className="orbit" style={{ width: `${size}%`, height: `${size}%` }} />
  );
}
