import {Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const BREAKPOINTS = {
  MOBILE_SMALL: 320,
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  DESKTOP_LARGE: 1200,
};

export const isSmallMobile = SCREEN_WIDTH <= BREAKPOINTS.MOBILE_SMALL;
export const isMobile = SCREEN_WIDTH <= BREAKPOINTS.MOBILE;
export const isTablet = SCREEN_WIDTH <= BREAKPOINTS.TABLET;
export const isDesktop = SCREEN_WIDTH >= BREAKPOINTS.DESKTOP;
export const isLargeDesktop = SCREEN_WIDTH >= BREAKPOINTS.DESKTOP_LARGE;
