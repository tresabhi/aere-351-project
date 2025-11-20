import type { QuicklimeEvent } from "quicklime";
import { useContext, useEffect, useRef } from "react";
import { SimulationScaleContext } from "../../contexts/SimulationScale";
import { EFromM } from "../../util/EFromM";
import { timer } from "../../util/timer";
import "./index.css";

interface SatelliteProps {
  children: React.ReactNode;
  rotate?: boolean;

  mu: number;

  omega?: number;
  e: number;
  a: number;
}

export function Satellite({
  children,
  mu,
  e,
  a,
  omega = 0,
  rotate = false,
}: SatelliteProps) {
  const satellite = useRef<HTMLDivElement>(null!);
  const simulationScale = useContext(SimulationScaleContext);

  useEffect(() => {
    function update(event: QuicklimeEvent<number>) {
      const t = event.data;

      const n = Math.sqrt(mu / a ** 3);
      const M = n * t;
      const E = EFromM(M, e);
      const theta =
        2 * Math.atan(Math.sqrt((1 + e) / (1 - e)) * Math.tan(E / 2));

      const x0 = a * (Math.cos(E) - e);
      const y0 = a * Math.sqrt(1 - e ** 2) * Math.sin(E);

      const c = Math.cos(omega);
      const s = Math.sin(omega);
      const x = x0 * c - y0 * s;
      const y = x0 * s + y0 * c;

      satellite.current.style.left = `${(x / simulationScale) * 100 + 50}%`;
      satellite.current.style.top = `${(-y / simulationScale) * 100 + 50}%`;

      if (rotate) {
        satellite.current.style.transform = `translate(-50%, -50%) rotate(${
          -omega - theta
        }rad)`;
      }
    }

    timer.on(update);

    return () => {
      timer.off(update);
    };
  }, [a, e, omega, rotate]);

  return (
    <div ref={satellite} className="satellite">
      {children}
    </div>
  );
}
