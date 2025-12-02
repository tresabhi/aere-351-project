import type { QuicklimeEvent } from "quicklime";
import { useContext, useEffect, useState } from "react";
import { SimulationContext } from "../../contexts/Simulation";
import { Zoom, zoomEvent } from "../../util/zoom";
import "./index.css";

interface Props {
  r: number;
}

export function Orbit({ r }: Props) {
  const { scale0 } = useContext(SimulationContext);
  const [zoom, setZoom] = useState(zoomEvent.last!);
  const scale = scale0 * zoom;
  const size = (2 * r * 100) / scale;

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
    <div className="orbit" style={{ width: `${size}%`, height: `${size}%` }} />
  );
}
