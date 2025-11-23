import { useEffect, useState } from "react";
import { SIMULATION_SPEED, SimulationSpeed } from "../../util/timer";
import "./index.css";

export function Controls() {
  const [speed, setSpeed] = useState(SIMULATION_SPEED.value);

  useEffect(() => {
    SIMULATION_SPEED.value = speed;
  }, [speed]);

  return (
    <div className="speed-control">
      <span>SIM SPEED</span>

      {Object.values(SimulationSpeed).map((s) =>
        typeof s === "number" ? (
          <button
            key={s}
            data-selected={s === speed}
            onClick={() => setSpeed(s)}
          >
            x2<sup>{s}</sup>
          </button>
        ) : null
      )}
    </div>
  );
}
