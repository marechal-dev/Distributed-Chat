import styled from 'styled-components';
import { BubbleStyleProps } from './Messages';

export const BubbleContainer = styled.div<BubbleStyleProps>`
  display: flex;
  margin-bottom: 0.65rem;
  font-size: 1rem;
  justify-content: ${props => props.isMine ? 'flex-end' : 'flex-start'};

`;

export const Bubble = styled.div<BubbleStyleProps>`
  background-color: ${props => props.isMine ? '#504864' : '#584982'};
  border-radius: 15px;
  padding: 0.325rem 0.65rem;
  width: fit-content;
  word-wrap: break-word;
  max-width: 70%;
  min-width: 3rem;
  
  @media (max-width: 768px){
    min-width: 20%;
  }
`;

export const Name = styled.span`
  font-weight: bold;
  margin-bottom: 0.325rem;
`;