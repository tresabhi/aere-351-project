const TWO_PI = Math.PI * 2;

export function normalizeAngle(angle: number) {
  const mod = angle % TWO_PI;
  return mod < 0 ? mod + TWO_PI : mod;
}
