import { Quicklime } from "quicklime";

export enum SimulationSpeed {
  Paused = 0,
  Power8 = 8,
  Power11 = 11,
  Power13 = 13,
  Power18 = 18,
  Power24 = 24,
  Power26 = 27,
}

export const SIMULATION_SPEED = { value: SimulationSpeed.Paused };

export const timer = new Quicklime<number>(0);

let lastTimestamp = 0;

timer.on(() => {
  requestAnimationFrame((timestamp) => {
    const speed =
      SIMULATION_SPEED.value === SimulationSpeed.Paused
        ? 0
        : 2 ** SIMULATION_SPEED.value;
    const dt = timestamp - lastTimestamp;
    const t = timer.last! + speed * (dt / 1000);

    lastTimestamp = timestamp;
    timer.dispatch(t);
  });
});
timer.dispatch(timer.last!);
