import type { QuicklimeEvent } from "quicklime";
import { useContext, useEffect, useRef } from "react";
import { SimulationContext } from "../../contexts/Simulation";
import { EFromM } from "../../util/EFromM";
import { FFromM } from "../../util/FFromM";
import { timer } from "../../util/timer";
import "./index.css";

interface SatelliteProps {
  children: React.ReactNode;
  rotate?: boolean;

  t0?: number;
  omega?: number;
  e: number;
  a: number;
}

export function Satellite({
  children,
  e,
  a,
  omega = 0,
  rotate = false,
  t0 = 0,
}: SatelliteProps) {
  const satellite = useRef<HTMLDivElement>(null!);
  const { scale, mu } = useContext(SimulationContext);

  useEffect(() => {
    function update(event: QuicklimeEvent<number>) {
      let t = event.data - t0;

      let x0: number;
      let y0: number;
      let theta: number;

      if (e < 1) {
        const n = Math.sqrt(mu / a ** 3);
        const M = n * t;
        const E = EFromM(M, e);
        theta = 2 * Math.atan(Math.sqrt((1 + e) / (1 - e)) * Math.tan(E / 2));
        x0 = a * (Math.cos(E) - e);
        y0 = a * Math.sqrt(1 - e ** 2) * Math.sin(E);
      } else if (e === 1) {
        throw new Error("e = 1 currently unsupported");
      } else {
        const n = Math.sqrt(mu / -(a ** 3));
        const M = n * t;
        const F = FFromM(M, e);
        theta = 2 * Math.atan(Math.sqrt((e + 1) / (e - 1)) * Math.tanh(F / 2));
        x0 = a * (Math.cosh(F) - e);
        y0 = a * Math.sqrt(e ** 2 - 1) * Math.sinh(-F);
      }

      const c = Math.cos(omega);
      const s = Math.sin(omega);
      const x = x0 * c - y0 * s;
      const y = x0 * s + y0 * c;

      satellite.current.style.left = `${(x / scale) * 100 + 50}%`;
      satellite.current.style.top = `${(-y / scale) * 100 + 50}%`;

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
