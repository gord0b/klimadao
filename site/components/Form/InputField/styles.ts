import { css } from "@emotion/css";
import * as typography from "@klimadao/lib/theme/typography";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  display: grid;
  align-content: start;
  gap: 0.75rem;
`;

export const baseStyles = css`
  ${typography.caption};
  display: block;
  width: 100%;
  min-height: 4.8rem;
  color: var(--font-01);
  background-color: var(--surface-02);
  border-radius: 1rem;
  border: 0.175rem solid var(--surface-03);
  padding-left: 1rem;
  transition: border-color 0.2s ease-in;
  outline: none;
  padding: 1rem;

  ::placeholder {
    ${typography.caption};
    color: var(--font-03);
  }

  &:focus,
  &:hover {
    border-color: var(--klima-green);
  }

  &:disabled {
    border: none;
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const visuallyHidden = css`
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
`;

export const errorStyles = css`
  border-color: var(--warn);
  &:focus,
  &:hover {
    border-color: var(--warn);
  }
`;

export const errorMessage = css`
  font-size: 1.2rem;
  line-height: 1.4rem;
  font-weight: 400;
  color: var(--warn);

  ${breakpoints.large} {
    font-size: 1.4rem;
    line-height: 1.2rem;
  }
`;
