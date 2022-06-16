import styled from "styled-components/native";
import { FlexStyle, FlexAlignType } from "react-native";

import { marginMixin, MarginMixin } from "../mixins/margin";
import { paddingMixin, PaddingMixin } from "../mixins/padding";
import { getCssValue } from "../../utils/utils";
import { positionedMixin, PositionedMixin } from "../mixins/positioned";
import { FlexMixin, flexMixin } from "../mixins/flex";

export type StyledViewProps = Partial<
  {
    bgColor: string;

    overflow: "visible" | "hidden" | "scroll";

    height: number | string;
    maxWidth: number | string;
    minHeight: number | string;
    maxHeight: number | string;
    width: number | string;

    self: string;
    alignItems: FlexAlignType;
    justifyContent: FlexStyle["justifyContent"];

    borderRadius: number | string;
    zIndex: number;
    opacity: number;
    borderWidth: number;
    borderBottomLeftRadius: number;
    borderBottomRightRadius: number;
    borderTopRightRadius: number;
    borderTopLeftRadius: number;
    borderColor: string;
    aspectRatio: number;
  } & MarginMixin &
    PaddingMixin &
    PositionedMixin &
    FlexMixin
>;

export const StyledView = styled.View<StyledViewProps>`
  ${marginMixin}
  ${paddingMixin}
  ${positionedMixin}
  ${flexMixin}

  ${({ bgColor }) => bgColor && `background-color: ${bgColor}`};
  ${({ opacity }) => opacity && `opacity: ${opacity}`};

  ${({ overflow }) => overflow && `overflow: ${overflow}`};

  ${({ width }) => width && `width: ${getCssValue(width)}`};
  ${({ maxWidth }) => maxWidth && `max-width: ${getCssValue(maxWidth)}`};
  ${({ height }) => height && `height: ${getCssValue(height)}`};
  ${({ minHeight }) => minHeight && `min-height: ${getCssValue(minHeight)}`};

  ${({ self }) => self && `align-self: ${self}`};
  ${({ alignItems }) => alignItems && `align-items: ${alignItems}`};
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent}`};

  ${({ borderRadius }) =>
    borderRadius && `border-radius: ${getCssValue(borderRadius)}`};
  ${({ zIndex }) => zIndex && `z-index: ${getCssValue(zIndex)}`};
`;
