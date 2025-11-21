import {
  M_TO_ECCENTRIC_MAX_ITERATIONS,
  M_TO_ECCENTRIC_THRESHOLD,
} from "./EFromM";

export function FFromM(M: number, e: number) {
  let F = Math.asinh(M / e);

  for (let i = 0; i < M_TO_ECCENTRIC_MAX_ITERATIONS; i++) {
    const f = e * Math.sinh(F) - F - M;
    const fp = e * Math.cosh(F) - 1;
    const dF = f / fp;

    F -= dF;

    if (Math.abs(dF) < M_TO_ECCENTRIC_THRESHOLD) break;
  }

  return F;
}
