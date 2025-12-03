import { Quicklime } from "quicklime";

export const SIMULATION_SPEED = { value: 0 };

export const timer = new Quicklime<number>(0);

let lastTimestamp = 0;

timer.on(() => {
  requestAnimationFrame((timestamp) => {
    const speed =
      SIMULATION_SPEED.value === 0 ? 0 : 2 ** SIMULATION_SPEED.value;
    const dt = timestamp - lastTimestamp;
    const t = timer.last! + speed * (dt / 1000);

    lastTimestamp = timestamp;
    timer.dispatch(t);
  });
});
timer.dispatch(timer.last!);
