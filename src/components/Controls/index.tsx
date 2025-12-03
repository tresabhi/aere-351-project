import type { QuicklimeEvent } from "quicklime";
import { useEffect, useState } from "react";
import { pauseNextReEntryEvent } from "../../util/pauseNextReEntry";
import { SIMULATION_SPEED } from "../../util/timer";
import { zoomEvent } from "../../util/zoom";
import "./index.css";

export function Controls() {
  const [speed, setSpeed] = useState(SIMULATION_SPEED.value);
  const [zoom, setZoom] = useState(zoomEvent.last!);
  const [pauseNextReEntry, setPauseNextReEntry] = useState(
    pauseNextReEntryEvent.last!
  );

  useEffect(() => {
    SIMULATION_SPEED.value = speed;
  }, [speed]);

  useEffect(() => {
    zoomEvent.dispatch(zoom);
  }, [zoom]);

  useEffect(() => {
    pauseNextReEntryEvent.dispatch(pauseNextReEntry);
  }, [pauseNextReEntry]);

  useEffect(() => {
    function handlePauseNextReEntry(event: QuicklimeEvent<boolean>) {
      setPauseNextReEntry(event.data);

      if (!event.data) setSpeed(0);
    }

    pauseNextReEntryEvent.on(handlePauseNextReEntry);

    return () => {
      pauseNextReEntryEvent.off(handlePauseNextReEntry);
    };
  }, []);

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

        <label>
          x2<sup>0</sup>
        </label>
        <input
          type="range"
          step="any"
          min={2 ** 0}
          max={2 ** 6}
          value={zoom}
          onChange={(event) => {
            setZoom(event.target.valueAsNumber);
          }}
        />
        <label>
          x2<sup>6</sup>
        </label>
      </div>

      <div className="control">
        <span>PAUSE NEXT RE-ENTRY</span>
        <input
          checked={pauseNextReEntry}
          onChange={() => {
            setPauseNextReEntry((state) => !state);
          }}
          type="checkbox"
        />
      </div>
    </div>
  );
}
