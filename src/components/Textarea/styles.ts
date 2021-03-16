import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface TextareaProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<TextareaProps>`
  background: #fff;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  padding: 13px;
  width: 100%;
  color: #999;

  display: flex;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border: 2px solid;
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border: 2px solid;
      color: #5bbf4a;
    `}

    ${props =>
    props.isFilled &&
    css`
      border: 2px solid;
      color: #5bbf4a;
    `}

  label {
    font-size: 14px;
    color: #444444;
    text-align: left;
    margin-bottom: 4px;
    font-weight: bold;
    margin-top: 12px !important;
  }

  textarea {
    flex: 1;
    background: transparent;
    border: 0;
    color: #000;

    &::placeholder {
      color: #c4c4c4;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  color: #444444;
  text-align: left;
  margin-bottom: 4px;
  font-weight: bold;
  margin-top: 12px !important;
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
