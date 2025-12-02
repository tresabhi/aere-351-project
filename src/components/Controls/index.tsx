import { useEffect, useState } from "react";
import { SIMULATION_SPEED, SimulationSpeed } from "../../util/timer";
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

        {Object.values(SimulationSpeed).map((s) =>
          typeof s === "number" ? (
            <button
              key={s}
              data-selected={s === speed}
              onClick={() => setSpeed(s)}
            >
              {s === SimulationSpeed.Paused ? (
                "||"
              ) : (
                <>
                  x2<sup>{s}</sup>
                </>
              )}
            </button>
          ) : null
        )}
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
