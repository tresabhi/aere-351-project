import { useEffect, useState } from "react";
import { SIMULATION_SPEED } from "../../util/timer";
import { Zoom, zoomEvent } from "../../util/zoom";
import "./index.css";

export function Controls() {
  const [speed, setSpeed] = useState(SIMULATION_SPEED.value);
  const [zoom, setZoom] = useState(zoomEvent.last!);

  useEffect(() => {
    SIMULATION_SPEED.value = speed;
  }, [speed]);

  useEffect(() => {
    zoomEvent.dispatch(zoom);
  }, [zoom]);

  return (
    <div className="controls">
      <div className="control">
        <span>SIM SPEED</span>

        <label>
          x2<sup>8</sup>
        </label>
        <input
          type="range"
          min={8}
          max={32}
          value={speed}
          onChange={(event) => {
            setSpeed(event.target.valueAsNumber);
          }}
        />
        <label>
          x2<sup>32</sup>
        </label>
      </div>

      <div className="control">
        <span>ZOOM</span>

        {Object.values(Zoom).map((z) =>
          typeof z === "number" ? (
            <button
              key={z}
              data-selected={z === zoom}
              onClick={() => setZoom(z)}
            >
              x{z}
            </button>
          ) : null
        )}
      </div>
    </div>
  );
}
