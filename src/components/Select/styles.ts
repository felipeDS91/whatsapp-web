import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  > svg {
    margin-left: 14px;
    fill: #888888;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
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
      color: #5bbf4a;
      border-color: #5bbf4a;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #5bbf4a;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #333;

    &::placeholder {
      color: #777;
    }
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
  margin-right: 16px;

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
