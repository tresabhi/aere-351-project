import type { QuicklimeEvent } from "quicklime";
import { useEffect, useState } from "react";
import { r_jupiter } from "../../util/constants";
import { zoomEvent, type Zoom } from "../../util/zoom";
import { Satellite } from "../Satellite";
import "./index.css";

export enum TrojanKind {
  Blue,
  Red,
}

const COLORS = {
  [TrojanKind.Blue]: "https://i.imgur.com/ArXRuko.png",
  [TrojanKind.Red]: "https://i.imgur.com/644NpfL.png",
};
export const TROJAN_OMEGAS = {
  [TrojanKind.Blue]: Math.PI / 3,
  [TrojanKind.Red]: -Math.PI / 3,
};

interface Props {
  color: TrojanKind;
}

export function Trojan({ color }: Props) {
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
    <Satellite rotate a={r_jupiter} e={0} omega={TROJAN_OMEGAS[color]}>
      <img
        className="trojan"
        src={COLORS[color]}
        style={{ width: `${8 / zoom}rem` }}
      />
    </Satellite>
  );
}
