import { useContext, useEffect, useState } from "react";
import { Host, SimulationContext } from "../../contexts/Simulation";
import { mineSats, MineSatState } from "../../stores/mineSats";
import { r_M } from "../../util/constants";
import { Satellite } from "../Satellite";
import "./index.css";

const TROJAN_STD_DEV = Math.PI * 2 ** -5;

function Representation() {
  return <div className="mine-sat" />;
}

interface MineSatProps {
  index: number;
}

export function MineSat({ index }: MineSatProps) {
  const { host } = useContext(SimulationContext);

  const [visible, setVisible] = useState(false);
  const [a, setA] = useState(r_M);
  const [e, setE] = useState(0);
  const [omega, setOmega] = useState(0);

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
    <Satellite a={a} e={e} omega={omega}>
      <Representation />
    </Satellite>
  );
}
