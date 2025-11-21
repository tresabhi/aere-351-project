export const M_TO_ECCENTRIC_THRESHOLD = 2 ** -3;
export const M_TO_ECCENTRIC_MAX_ITERATIONS = 20;

export function EFromM(M: number, e: number) {
  let E = e < 0.8 ? M : Math.PI;

  for (let i = 0; i < M_TO_ECCENTRIC_MAX_ITERATIONS; i++) {
    const f = E - e * Math.sin(E) - M;
    const fp = 1 - e * Math.cos(E);
    const dE = f / fp;

    E -= dE;

    if (Math.abs(dE) < M_TO_ECCENTRIC_THRESHOLD) break;
  }

  return E;
}
