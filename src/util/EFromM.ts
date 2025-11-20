// const THRESHOLD = 1e-12;
const THRESHOLD = 1e-4;

export function EFromM(M: number, e: number) {
  let E = e < 0.8 ? M : Math.PI;

  for (let i = 0; i < 20; i++) {
    const f = E - e * Math.sin(E) - M;
    const fp = 1 - e * Math.cos(E);
    const dE = f / fp;

    E -= dE;

    if (Math.abs(dE) < THRESHOLD) break;
  }

  return E;
}
