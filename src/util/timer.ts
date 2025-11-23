import { Quicklime } from "quicklime";

// export const SIMULATION_SPEED = { value: 2 ** 24 };
export const SIMULATION_SPEED = { value: 2 ** 10 };

export const timer = new Quicklime<number>(0);

let lastTimestamp = 0;

timer.on(() => {
  requestAnimationFrame((timestamp) => {
    const dt = timestamp - lastTimestamp;
    const t = timer.last! + SIMULATION_SPEED.value * (dt / 1000);

    lastTimestamp = timestamp;
    timer.dispatch(t);
  });
});
timer.dispatch(0);
