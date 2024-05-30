import { hs, mhs, mvs, vs } from "helpers/system.helper";


/**
 * Fontsize for text and icon
 */
export const FontSize = {
  //Default special size
  H1: mhs(28, 0.3),
  H2: mhs(28, 0.3) - 3,
  H3: mhs(28, 0.3) - 6,
  H4: mhs(28, 0.3) - 9,
  H5: mhs(28, 0.3) - 12,


  _2: mhs(2, 0.3),

};

/**
 * Scale by screen horizontal ratio for size compensation
 */
export const HS = {
  _1: hs(1),
};

/**
 * Scale by screen vertical ratio for size compensation
 */
export const VS = {
  _1: vs(1),
  _10: vs(10),
  _50: vs(50),
  _160: vs(160),
  _32: vs(32),
};

/**
 * Scale by screen horizontal ratio with factor is 0.5 for size compensation
 */
export const MHS = {
  _1: mhs(1),
  _16: mhs(16),
  _140: mhs(140),
};

/**
 * Scale by screen vertical ratio with factor is 0.5 for size compensation
 */
export const MVS = {
  _1: mvs(1),
};
