import React from "react";

import styled from "styled-components/native";

import { moderateScale } from "../../utils/metrics";
import { marginMixin, MarginMixin } from "../mixins/margin";
import { paddingMixin, PaddingMixin } from "../mixins/padding";

export type StyledTextProps = Partial<
  {
    fontSize?: number;
    color?: string;
    letterSpacing?: number;
    lineHeight?: number;
    textAlign?: "auto" | "left" | "right" | "center" | "justify";
  } & MarginMixin &
    PaddingMixin
>;

export const StyledText = styled.Text<StyledTextProps>`
  ${marginMixin}
  ${paddingMixin}
  font-size: ${({ fontSize }) => moderateScale(fontSize || 14)};
  color: ${({ color }) => color || "black"};
  letter-spacing: ${({ letterSpacing }) => moderateScale(letterSpacing || 0)};

  ${({ lineHeight }) =>
    lineHeight && `line-height: ${moderateScale(lineHeight || 0)}`};
  ${({ textAlign }) => textAlign && `text-align: ${textAlign}`};
`;

type boldTextArray = Array<{ match?: boolean; text: string }>;

function parseDescription(descriptionBody: string): boldTextArray {
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
  StyledTextProps & {
    transformTo?: "SemiBold" | "Bold" | "Light";
    matchedTextProps?: StyledTextProps;
    children?: JSX.Element;
  }
> = ({ children, matchedTextProps, transformTo, ...props }) => {
  if (typeof children !== "string") {
    return <StyledText {...props}>{children}</StyledText>;
  }

  const textArray = parseDescription(children);

  return (
    <StyledText {...props}>
      {textArray.map(({ text, match }, index) => {
        const passProps = { ...props, ...(match ? matchedTextProps : {}) };

        return (
          <StyledText {...passProps} key={index}>
            {text}
          </StyledText>
        );
      })}
    </StyledText>
  );
};
