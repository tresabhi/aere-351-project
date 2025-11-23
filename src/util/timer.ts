import { Quicklime } from "quicklime";

export enum SimulationSpeed {
  Power11 = 11,
  Power24 = 24,
  Power26 = 27,
}

// export const SIMULATION_SPEED = { value: 2 ** 24 };
export const SIMULATION_SPEED = { value: SimulationSpeed.Power11 };

export const timer = new Quicklime<number>(0);

let lastTimestamp = 0;

timer.on(() => {
  requestAnimationFrame((timestamp) => {
    const speed = 2 ** SIMULATION_SPEED.value;
    const dt = timestamp - lastTimestamp;
    const t = timer.last! + speed * (dt / 1000);

    lastTimestamp = timestamp;
    timer.dispatch(t);
  });
});
timer.dispatch(0);
