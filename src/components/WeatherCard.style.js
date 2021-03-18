import { css } from "@emotion/core";
import colors from "@livechat/design-system-colors";

export const wrapperCss = css`
  background-color: #fff;
  margin-top: 8px;
  font-size: 15px;
  line-height: 16px;
  border-width: 1px;
  border-style: solid;
  border-color: ${colors.gray200};
  border-image: initial;
  border-radius: 8px;
  padding: 18px 18px 10px;
`;

export const titleWrapperCss = css`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
`;

export const titleCss = css`
  font-size: 18px;
  line-height: 24px;
  color: ${colors.gray700};
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
`;

export const bodyWrapperCss = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  line-height: 18px;
`;

export const footerWrapperCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  margin-bottom: 8px;
`;
