import { darken, shade } from 'polished';
import styled from 'styled-components';

interface CardProps {
  checked?: boolean;
}

interface ButtonProps {
  disabled?: boolean;
}

export const Container = styled.div`
  height: 100%;
  max-width: 800px;
  margin: auto;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  img {
    margin-top: 20px;
    align-self: center;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-around;
  align-items: flex-end;
  width: 100%;
`;

export const SearchButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0;
  background: #444;
  font-size: 12px;
  color: #fff;
  padding: 10px;
  margin-left: 12px;
  align-self: flex-end;
  height: 48px;
  border-radius: 4px 0 0 4px;

  &:hover {
    background: ${darken(0.08, '#444')};
  }

  svg {
    margin-right: 2px;
  }
`;

export const OptionsButton = styled.button.attrs(_ => ({
  type: 'button',
}))`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0;
  background: #444;
  color: #fff;
  padding: 10px;
  align-self: flex-end;
  height: 48px;
  border-radius: 0 4px 4px 0;
  border-left: 1px solid;

  &:hover {
    background: ${darken(0.08, '#444')};
  }
`;

export const OptionsItem = styled.button.attrs(_ => ({
  type: 'button',
}))<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  font-size: 14px;
  color: #444;
  padding: 10px;
  align-self: flex-end;
  margin: 1px 0 1px 0;
  width: 100%;
  height: 48px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  svg {
    margin: 0 6px;
  }

  &:hover {
    background: ${props => !props.disabled && darken(0.08, '#F0F0F0')};
  }
`;

export const DeleteButton = styled.button<ButtonProps>`
  border-radius: 4px;
  height: 24px;
  width: 100px;
  margin-left: auto;
  margin-top: 12px;
  font-weight: 500;
  transition: background-color 0.2s;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &:hover {
    background: ${props => (!props.disabled ? shade(0.4, '#444') : null)};
  }

  svg {
    margin: 0 6px;
  }

  background: ${props => (props.disabled ? '#eeeeee' : '#444')};
  color: ${props => (props.disabled ? '#d0d0d0' : '#fff')};
  border: ${props => (props.disabled ? '1px solid #d0d0d0' : '0')};

  @media (max-width: 769px) {
    width: 100%;
    margin-left: 0px;
  }
`;

export const Card = styled.div<CardProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 24px;
  padding: 18px;
  background: #fff;
  border-radius: 4px;
  box-shadow: ${props =>
      props.checked ? 'rgba(0, 0, 0)' : 'rgba(0, 0, 0, 0.3)'}
    0 0 10px;

  cursor: pointer;

  &:hover {
    background: ${darken(0.1, '#fff')};
  }

  @media (max-width: 769px) {
    flex-direction: column;
  }
`;

export const CardItem = styled.div`
  font-weight: bold;
  margin-right: 4px;
`;

export const Filter = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  & + div {
    margin-top: 8px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  & + div {
    margin-top: 8px;
  }

  @media (max-width: 769px) {
    justify-content: center;
    flex-direction: column;
  }
`;

export const Column = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: ${props => (props.width ? props.width : '100%')};

  input {
    width: 100%;
  }

  & + div {
    padding-left: 12px;
  }

  @media (max-width: 769px) {
    width: 100%;
    & + div {
      padding-left: 0px;
      padding-top: 10px;
    }
  }
`;
