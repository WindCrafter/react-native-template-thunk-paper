import SystemHelper from "helpers/system.helper";

const mhs = SystemHelper.mhs;
const hs = SystemHelper.hs;
const vs = SystemHelper.vs;
const mvs = SystemHelper.mvs;


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
  _16: mhs(16, 0.3),
  _18: mhs(18, 0.3),
  _22: mhs(22, 0.3),

};

/**
 * Scale by screen horizontal ratio for size compensation
 */
export const HS = {
  _1: hs(1),
  _6: hs(6),
  _20: hs(20),
  _24: hs(24),
  _48: hs(48),
  _72: hs(72),
};

/**
 * Scale by screen vertical ratio for size compensation
 */
export const VS = {
  _1: vs(1),
  _10: vs(10),
  _12: vs(12),
  _16: vs(16),
  _20: vs(20),
  _50: vs(50),
  _160: vs(160),
  _32: vs(32),
};

/**
 * Scale by screen horizontal ratio with factor is 0.5 for size compensation
 */
export const MHS = {
  _1: mhs(1),
  _4: mhs(4),
  _6: mhs(6),
  _8: mhs(8),
  _10: mhs(10),
  _12: mhs(12),
  _16: mhs(16),
  _18: mhs(18),
  _140: mhs(140),
};

/**
 * Scale by screen vertical ratio with factor is 0.5 for size compensation
 */
export const MVS = {
  _1: mvs(1),
};
