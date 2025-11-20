import { useContext } from "react";
import { SimulationScaleContext } from "../../contexts/SimulationScale";
import "./index.css";

interface Props {
  r: number;
}

export function Orbit({ r }: Props) {
  const simulationScale = useContext(SimulationScaleContext);
  const size = (2 * r * 100) / simulationScale;

  return (
    <div className="orbit" style={{ width: `${size}%`, height: `${size}%` }} />
  );
}
