import { darken } from 'polished';
import styled from 'styled-components';

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

export const SendButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: 4px;
  background: #5bbf4a;
  font-size: 12px;
  color: #fff;
  padding: 10px;
  height: 48px;
  margin-top: 12px;

  &:hover {
    background: ${darken(0.08, '#5BBF4A')};
  }

  svg {
    align-self: center;
    margin-right: 4px;
  }
`;
