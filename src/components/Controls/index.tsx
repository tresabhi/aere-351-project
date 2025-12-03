import { useEffect, useState } from "react";
import { SIMULATION_SPEED } from "../../util/timer";
import { zoomEvent } from "../../util/zoom";
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
          step="any"
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

        <label>x1</label>
        <input
          type="range"
          step="any"
          min={1}
          max={64}
          value={zoom}
          onChange={(event) => {
            setZoom(event.target.valueAsNumber);
          }}
        />
        <label>x64</label>
      </div>
    </div>
  );
}
