import { darken } from 'polished';
import styled from 'styled-components';

interface CardProps {
  checked?: boolean;
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
  border-radius: 4px;

  &:hover {
    background: ${darken(0.08, '#444')};
  }

  svg {
    margin-right: 2px;
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
