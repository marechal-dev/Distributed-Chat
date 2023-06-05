import React from 'react'
import { BubbleContainer, Bubble, Name } from './styles';


interface BubbleProps {
  name: string;
  message: string;
  isMine: boolean;
}
export interface BubbleStyleProps {
  isMine: boolean;
}
const Messages: React.FC<BubbleProps> = ({ name, message, isMine }) => {
  return (
    <BubbleContainer isMine={isMine}>
      <Bubble isMine={isMine}>
        <Name>{isMine ? "" : name}</Name>
        <div>{message}</div>
      </Bubble>
    </BubbleContainer>
  )
}

export default Messages
