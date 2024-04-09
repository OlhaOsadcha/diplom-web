import { ObjectValues } from '../utils/typescript-utils';

export const LIB_COLOR = {
  accentBlue: 'accent-blue',
  accentGreen: 'accent-green',
  accentRed: 'accent-red',
  accentYellow: 'accent-yellow',
  primaryBlue: 'primary-blue',
  primaryYellow: 'primary-yellow',
  secondaryGrey: 'secondary-grey',
};

export type LibColor = ObjectValues<typeof LIB_COLOR>;
