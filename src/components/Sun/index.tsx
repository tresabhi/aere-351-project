import type { QuicklimeEvent } from "quicklime";
import { useEffect, useState } from "react";
import { zoomEvent } from "../../util/zoom";
import "./index.css";

export function Sun() {
  const [zoom, setZoom] = useState(zoomEvent.last!);

  useEffect(() => {
    function handleZoom(event: QuicklimeEvent<number>) {
      setZoom(event.data);
    }

    zoomEvent.on(handleZoom);

    return () => {
      zoomEvent.off(handleZoom);
    };
  }, []);

  return (
    <div
      className="sun"
      style={{
        width: `${1.5 / zoom}rem`,
        height: `${1.5 / zoom}rem`,
      }}
    />
  );
}
