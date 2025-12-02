import { times } from "lodash-es";
import type { QuicklimeEvent } from "quicklime";
import { useEffect, useState } from "react";
import { Host, SimulationContext } from "../../contexts/Simulation";
import { mu_mars, N, r_harbor } from "../../util/constants";
import { Zoom, zoomEvent } from "../../util/zoom";
import { Harbor } from "../Harbor";
import { Label } from "../Label";
import { MarsStatic } from "../MarsStatic";
import { MineSat } from "../MineSat";
import { Orbit } from "../Orbit";
import "./index.css";

export function MartianSystem() {
  const [zoom, setZoom] = useState(zoomEvent.last!);

  useEffect(() => {
    function handleZoom(event: QuicklimeEvent<Zoom>) {
      setZoom(event.data);
    }

    zoomEvent.on(handleZoom);

    return () => {
      zoomEvent.off(handleZoom);
    };
  }, []);

  return (
    <SimulationContext
      value={{ scale: zoom * r_harbor, mu: mu_mars, host: Host.Mars }}
    >
      <div className="system">
        <Label>MARTIAN SYSTEM</Label>

        <Orbit r={r_harbor} />

        <Harbor />

        {times(N, (index) => (
          <MineSat key={index} index={index} />
        ))}

        <MarsStatic />
      </div>
    </SimulationContext>
  );
}
