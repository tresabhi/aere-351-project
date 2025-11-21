export const N = 1;

export const R_mars = 3389.5;

export const r_mars = 2.279e8;
export const r_jupiter = 7.785e8;
export const r_harbor = R_mars + 2000;

export const a_mars = r_mars;
export const a_jupiter = r_jupiter;

export const mu_mars = 4.2828e4;
export const mu_jupiter = 1.2669e8;
export const mu_sun = 1.3271244e11;

export const T_mars = 2 * Math.PI * Math.sqrt(a_mars ** 3 / mu_sun);
export const T_jupiter = 2 * Math.PI * Math.sqrt(a_jupiter ** 3 / mu_sun);
export const T_s = 1 / Math.abs(1 / T_mars - 1 / T_jupiter);

export const delta_theta = Math.PI * (1 - Math.sqrt(a_mars / a_jupiter));
