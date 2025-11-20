import type { QuicklimeEvent } from "quicklime";
import { useEffect, useRef } from "react";
import { mu_S, r_M } from "../../util/constants";
import { timeEvent } from "../../util/time";
import "./index.css";

export function Mars() {
  const mars = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    function update(event: QuicklimeEvent<number>) {
      const t = event.data;
      const a = r_M;
      const n = Math.sqrt(mu_S / a ** 3);
      const M = n * t;
    }

    timeEvent.on(update);

    return () => {
      timeEvent.off(update);
    };
  }, []);

  return <div className="mars" ref={mars} />;
}
