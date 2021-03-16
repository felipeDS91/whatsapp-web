import { darken, shade } from 'polished';
import styled from 'styled-components';

interface DeleteButtonProps {
  disabled?: boolean;
}

export const Container = styled.div`
  height: 100vh;
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

export const User = styled.strong`
  margin-left: 4px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-around;
  align-items: flex-end;
  width: 100%;
`;

export const RefreshButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0;
  border-radius: 4px;
  background: #5bbf4a;
  font-size: 12px;
  color: #fff;
  padding: 10px;
  margin-left: auto;

  &:hover {
    background: ${darken(0.08, '#5BBF4A')};
  }

  svg {
    margin-right: 2px;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 24px;
  padding: 18px;
  background: #fff;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 0 10px;

  @media (max-width: 769px) {
    flex-direction: column;
  }
`;

export const CardItem = styled.div`
  font-weight: bold;
  margin-right: 4px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

export const Column = styled.div<{ width?: string }>`
  display: flex;
  position: relative;
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
    & + div {
      padding-left: 0px;
      padding-top: 10px;
    }
  }
`;

export const DeleteButton = styled.button<DeleteButtonProps>`
  background: #444;
  color: #fff;
  border-radius: 4px;
  border: 0;
  height: 24px;
  width: 200px;
  margin-left: 12px;
  font-weight: 500;
  transition: background-color 0.2s;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &:hover {
    background: ${shade(0.4, '#444')};
  }

  svg {
    margin: 0 6px;
  }

  @media (max-width: 769px) {
    width: 100%;
    margin-left: 0px;
    margin-top: 12px;
  }
`;
