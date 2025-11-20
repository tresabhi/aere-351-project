import type { QuicklimeEvent } from "quicklime";
import { useEffect, useRef } from "react";
import { mu_S, r_M, SOLAR_SYSTEM_SIZE } from "../../util/constants";
import { EFromM } from "../../util/EFromM";
import { normalizeAngle } from "../../util/normalizeAngle";
import { timer } from "../../util/timer";
import "./index.css";

export function Mars() {
  const mars = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    function update(event: QuicklimeEvent<number>) {
      const t = event.data;
      const e = 0;
      const r = r_M;
      const a = r;

      const n = Math.sqrt(mu_S / a ** 3);
      const M = normalizeAngle(n * t);
      const E = EFromM(M, e);
      const theta =
        2 * Math.atan(Math.sqrt((1 + e) / (1 - e)) * Math.tan(E / 2));

      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);

      mars.current.style.left = `${(x / SOLAR_SYSTEM_SIZE) * 100 + 50}%`;
      mars.current.style.top = `${(-y / SOLAR_SYSTEM_SIZE) * 100 + 50}%`;
    }

    timer.on(update);

    return () => {
      timer.off(update);
    };
  }, []);

  return <div className="mars" ref={mars} />;
}
