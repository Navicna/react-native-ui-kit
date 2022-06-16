import React from "react";
import styled from "styled-components/native";
import { FlexStyle, FlexAlignType } from "react-native";

import { marginMixin, MarginMixin } from "./mixins/margin";
import { paddingMixin, PaddingMixin } from "./mixins/padding";
import { getCssValue } from "./utils";
import { positionedMixin, PositionedMixin } from "./mixins/positioned";
import { FlexMixin, flexMixin } from "./mixins/flex";

export type ContainerProps = Partial<
  {
    bgColor: string;

    overflow: "visible" | "hidden" | "scroll";

    height: number | string;
    maxWidth: number | string;
    minHeight: number | string;
    maxHeight: number | string;
    width: number | string;

    self: string;
    items: FlexAlignType;
    justify: FlexStyle["justifyContent"];

    borderRadius: number | string;
    zIndex: number;
    opacity: number;
    borderWidth: number;
    borderColor: string;
    aspectRatio: number;
  } & MarginMixin &
    PaddingMixin &
    PositionedMixin &
    FlexMixin
>;

export const Container = styled.View<ContainerProps>`
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
  ${({ items }) => items && `align-items: ${items}`};
  ${({ justify }) => justify && `justify-content: ${justify}`};

  ${({ borderRadius }) =>
    borderRadius && `border-radius: ${getCssValue(borderRadius)}`};
  ${({ zIndex }) => zIndex && `z-index: ${getCssValue(zIndex)}`};
`;
