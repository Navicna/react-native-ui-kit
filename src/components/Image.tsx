import styled from "styled-components/native";
import { ImageProps } from "react-native";

import { marginMixin, MarginMixin } from "./mixins/margin";
import { paddingMixin, PaddingMixin } from "./mixins/padding";
import { positionedMixin, PositionedMixin } from "./mixins/positioned";
import { getCssValue } from "./utils";

export type StyledImageProps = Partial<
  {
    height: number | string;
    maxWidth: number | string;
    minHeight: number | string;
    width: number | string;
    rotate: number;

    self: string;

    borderRadius: number | string;
    zIndex: number;
    opacity: number;
  } & MarginMixin &
    PaddingMixin &
    PositionedMixin &
    ImageProps
>;

export const Image = styled.Image<StyledImageProps>`
  ${marginMixin}
  ${paddingMixin}
  ${positionedMixin}

  ${({ opacity }) => opacity && `opacity: ${opacity}`};

  ${({ width }) => width && `width: ${getCssValue(width)}`};
  ${({ maxWidth }) => maxWidth && `max-width: ${getCssValue(maxWidth)}`};
  ${({ height }) => height && `height: ${getCssValue(height)}`};
  ${({ minHeight }) => minHeight && `min-height: ${getCssValue(minHeight)}`};

  ${({ self }) => self && `align-self: ${self}`};

  ${({ borderRadius }) =>
    borderRadius && `border-radius: ${getCssValue(borderRadius)}`};
  ${({ zIndex }) => zIndex && `z-index: ${getCssValue(zIndex)}`};

  ${({ rotate }) => rotate && `transform: rotate(${rotate}deg)`};
`;
