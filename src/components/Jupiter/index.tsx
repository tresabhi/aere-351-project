import type { QuicklimeEvent } from "quicklime";
import { useEffect, useState } from "react";
import { r_jupiter } from "../../util/constants";
import { zoomEvent } from "../../util/zoom";
import { Satellite } from "../Satellite";
import "./index.css";

export function Jupiter() {
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
    <Satellite a={r_jupiter} e={0}>
      <div
        className="jupiter"
        style={{ width: `${1 / zoom}rem`, height: `${1 / zoom}rem` }}
      />
    </Satellite>
  );
}
