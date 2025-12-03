import type { QuicklimeEvent } from "quicklime";
import { useEffect, useState } from "react";
import { r_harbor } from "../../util/constants";
import { zoomEvent, type Zoom } from "../../util/zoom";
import { Satellite } from "../Satellite";
import "./index.css";

export function Harbor() {
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
    <Satellite a={r_harbor} e={0}>
      <div
        className="harbor"
        style={{
          width: `${2 / zoom}rem`,
          height: `${2 / zoom}rem`,
        }}
      />
    </Satellite>
  );
}
