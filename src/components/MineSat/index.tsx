import { useContext, useEffect, useState } from "react";
import { Host, SimulationContext } from "../../contexts/Simulation";
import { mineSats, MineSatState } from "../../stores/mineSats";
import { Satellite } from "../Satellite";
import "./index.css";

interface MineSatProps {
  index: number;
}

function Representation() {
  return <div className="mine-sat" />;
}

export function MineSat({ index }: MineSatProps) {
  const { host } = useContext(SimulationContext);

  const initialMineSat = mineSats[index];
  const [visible, setVisible] = useState(false);
  const [t0, setT0] = useState(initialMineSat.t0);
  const [a, setA] = useState(initialMineSat.a);
  const [e, setE] = useState(initialMineSat.e);
  const [omega, setOmega] = useState(initialMineSat.omega);

  useEffect(() => {
    function callback() {
      const mineSat = mineSats[index];
      let intendedHost: Host;

      switch (mineSat.state) {
        case MineSatState.Depositing:
        case MineSatState.AwaitingTrojan:
        case MineSatState.HyperbolicEscape:
        case MineSatState.HyperbolicReturn:
        case MineSatState.Parked:
        case MineSatState.Phasing:
          intendedHost = Host.Mars;
          break;

        case MineSatState.EllipticalEscape:
        case MineSatState.MiningTrojan:
        case MineSatState.AwaitingMars:
        case MineSatState.EllipticalReturn:
          intendedHost = Host.Sun;
          break;
      }

      setVisible(intendedHost === host);
      setT0(mineSat.t0);
      setA(mineSat.a);
      setE(mineSat.e);
      setOmega(mineSat.omega);
    }

    mineSats[index].callbacks.push(callback);
    callback();

    return () => {
      mineSats[index].callbacks = mineSats[index].callbacks.filter(
        (c) => c !== callback
      );
    };
  }, []);

  if (!visible) return null;

  return (
    <Satellite debug t0={t0} a={a} e={e} omega={omega}>
      <Representation />
    </Satellite>
  );
}
