import React from "react";

import styled from "styled-components/native";

import { moderateScale } from "./metrics";
import { marginMixin, MarginMixin } from "./mixins/margin";
import { paddingMixin, PaddingMixin } from "./mixins/padding";

export type TextProps = Partial<
  {
    size?: number;
    color?: string;
    letterSpacing?: number;
    lineHeight?: number;
    align?: "auto" | "left" | "right" | "center" | "justify";
    weight?: "SemiBold" | "Bold" | "Light" | "Regular";
  } & MarginMixin &
    PaddingMixin
>;

export const Text = styled.Text<TextProps>`
  ${marginMixin}
  ${paddingMixin}
  font-size: ${({ size }) => moderateScale(size || 14)};
  color: ${({ color }) => color || "black"};
  letter-spacing: ${({ letterSpacing }) => moderateScale(letterSpacing || 0)};

  ${({ lineHeight }) =>
    lineHeight && `line-height: ${moderateScale(lineHeight || 0)}`};
  ${({ align }) => align && `text-align: ${align}`};

  font-family: ${({ weight }) => {
    const fontWeight = weight ? weight : undefined;
    return fontWeight;
  }};
`;

type boldTextArray = Array<{ match?: boolean; text: string }>;

function parseDescription(descriptionBody: string): boldTextArray {
  //    input: 'buy **something**'
  //    output: [{ text: 'buy' }, { text: 'something', highlight: true }]

  const regex = /\*\*/g;
  const output: boldTextArray = [];

  if (!descriptionBody.length) {
    return output;
  }

  let remainText = descriptionBody;
  while (remainText.length) {
    const sepFoundAt = remainText.search(regex);
    switch (sepFoundAt) {
      case -1: {
        output.push({ text: remainText });
        return output;
      }

      case 0:
        const nextSepFoundAt = remainText.slice(2).search(regex);

        output.push({
          text: remainText.slice(2, nextSepFoundAt + 2),
          match: true,
        });

        remainText = remainText.slice(nextSepFoundAt + 4);
        break;

      default:
        output.push({ text: remainText.slice(0, sepFoundAt) });
        remainText = remainText.slice(sepFoundAt);
        break;
    }
  }

  return output;
}

export const TextWithSepOperator: React.FC<
  TextProps & {
    transformTo?: "SemiBold" | "Bold" | "Light";
    matchedTextProps?: TextProps;
    children?: JSX.Element;
  }
> = ({ children, matchedTextProps, transformTo, ...props }) => {
  if (typeof children !== "string") {
    return <Text {...props}>{children}</Text>;
  }

  const textArray = parseDescription(children);

  return (
    <Text {...props}>
      {textArray.map(({ text, match }, index) => {
        const passProps = { ...props, ...(match ? matchedTextProps : {}) };
        const weight = match ? transformTo || "Bold" : "Regular";

        return (
          <Text {...passProps} weight={weight} key={index}>
            {text}
          </Text>
        );
      })}
    </Text>
  );
};
