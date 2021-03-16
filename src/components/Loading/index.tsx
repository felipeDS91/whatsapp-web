import styled, { keyframes } from 'styled-components';
import { MdAutorenew } from 'react-icons/md';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
`;

export const Loading = styled(MdAutorenew)`
  animation: ${spin} 2s infinite linear;
`;
