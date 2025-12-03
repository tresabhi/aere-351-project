import type { QuicklimeEvent } from "quicklime";
import { useEffect, useState } from "react";
import { Zoom, zoomEvent } from "../../util/zoom";
import "./index.css";

export function MarsStatic() {
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
    <div
      className="mars-static"
      style={{
        width: `${1.5 / zoom}rem`,
        height: `${1.5 / zoom}rem`,
      }}
    />
  );
}
