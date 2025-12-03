import type { QuicklimeEvent } from "quicklime";
import { useEffect, useState } from "react";
import { r_mars } from "../../util/constants";
import { zoomEvent, type Zoom } from "../../util/zoom";
import { Satellite } from "../Satellite";
import "./index.css";

export function Mars() {
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
    <Satellite a={r_mars} e={0}>
      <div
        className="mars"
        style={{ width: `${0.75 / zoom}rem`, height: `${0.75 / zoom}rem` }}
      />
    </Satellite>
  );
}
