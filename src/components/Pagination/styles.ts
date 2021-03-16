import styled from 'styled-components';
import { lighten } from 'polished';

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 24px 0;

  span {
    font-size: 14px;
    font-weight: bold;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0;
  border-radius: 4px;
  background: ${props =>
    props.disabled ? lighten(0.08, '#5BBF4A') : '#5BBF4A'};
  font-size: 12px;
  color: #fff;
  padding: 12px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;
