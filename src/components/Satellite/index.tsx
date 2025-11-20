import type { QuicklimeEvent } from "quicklime";
import { useEffect, useRef } from "react";
import { SOLAR_SYSTEM_SIZE } from "../../util/constants";
import { EFromM } from "../../util/EFromM";
import { normalizeAngle } from "../../util/normalizeAngle";
import { timer } from "../../util/timer";
import "./index.css";

interface SatelliteProps {
  children: React.ReactNode;

  mu: number;

  omega?: number;
  e: number;
  a: number;
}

export function Satellite({ children, mu, e, a, omega = 0 }: SatelliteProps) {
  const satellite = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    function update(event: QuicklimeEvent<number>) {
      const t = event.data;

      const n = Math.sqrt(mu / a ** 3);
      const M = normalizeAngle(n * t + omega);
      const E = EFromM(M, e);

      const x = a * (Math.cos(E) - e);
      const y = a * Math.sqrt(1 + e ** 2) * Math.sin(E);

      satellite.current.style.left = `${(x / SOLAR_SYSTEM_SIZE) * 100 + 50}%`;
      satellite.current.style.top = `${(-y / SOLAR_SYSTEM_SIZE) * 100 + 50}%`;
    }

    timer.on(update);

    return () => {
      timer.off(update);
    };
  }, []);

  return (
    <div ref={satellite} className="satellite">
      {children}
    </div>
  );
}
