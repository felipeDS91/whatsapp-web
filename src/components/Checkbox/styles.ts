import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused?: boolean;
  isFilled?: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  padding: 13px;
  width: 100%;
  color: #999;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 10px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #000;
      border-color: #000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #000;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #000;
    height: 19px;
    width: 20px;

    &::placeholder {
      color: #777;
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
