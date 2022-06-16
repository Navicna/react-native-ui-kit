import { Dimensions } from 'react-native';

export enum ScreenDimensions {
  HEIGHT = 'HEIGHT',
  WIDTH = 'WIDTH',
  FULL_HEIGHT = 'FULL_HEIGHT',
  FULL_WIDTH = 'FULL_WIDTH',
}

const { width, height } = Dimensions.get('window');

export const isSmallDevice = width <= 375;

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

export function normalizeHeight(size: number) {
  return (size / guidelineBaseHeight) * height;
}

export function normalizeWidth(size: number) {
  return (size / guidelineBaseWidth) * width;
}

export const scale = (size: number) => (width / guidelineBaseWidth) * size;
export const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5): number =>
  size + (scale(size) - size) * factor;

export function screenProportion(
  dimension: 'HEIGHT' | 'WIDTH' | 'FULL_WIDTH' | 'FULL_HEIGHT',
  percentage?: number,
) {
  switch (dimension) {
    case ScreenDimensions.HEIGHT:
      return !!percentage ? height * percentage : 0;
    case ScreenDimensions.WIDTH:
      return !!percentage ? width * percentage : 0;
    case ScreenDimensions.FULL_HEIGHT:
      return height;
    case ScreenDimensions.FULL_WIDTH:
      return width;
    default:
      return 0;
  }
}

export const Metrics = {  
  xxsSpacing: moderateScale(4),
  xsSpacing: moderateScale(6),
  tinySpacing: moderateScale(8),
  smallSpacing: moderateScale(12),
  betweenSmallAndStandardSpacing: moderateScale(14),
  standardSpacing: moderateScale(16),
  moderateSpacing: moderateScale(20),
  largeSpacing: moderateScale(24),
  xlSpacing: moderateScale(32),
  xxlSpacing: moderateScale(40),
  ulSpacing: moderateScale(48),

  elevation: {
    default: 6,
    button: 4,
    modal: 6,
  },

  navbarHeight: moderateScale(56),

  productFloaterHeight: moderateScale(56),

  buttonHeight: moderateScale(36),
  defaultButtonHeight: moderateScale(56),
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  productCardImage: {
    single: {
      width: moderateScale(126),
      height: moderateScale(192),
    },
    bundle: {
      width: moderateScale(126),
      height: moderateScale(192),
    },
  },
  bannerWidth: width - 32,
  bannerHeight: (272 / 343) * width - 32,
  miniBannerWidth: width - 48,
  miniBannerHeight: (128 / 328) * width - 48,
};
