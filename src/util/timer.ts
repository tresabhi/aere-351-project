import { Quicklime } from "quicklime";

const SPEED = 2 ** 12;

export const timer = new Quicklime<number>(0);

let t0 = -1;

timer.on(() => {
  requestAnimationFrame((timestamp) => {
    if (t0 === -1) t0 = timestamp;

    const dt = timestamp - t0;
    const t = SPEED * (dt / 1000);

    timer.dispatch(t);
  });
});
timer.dispatch(0);
