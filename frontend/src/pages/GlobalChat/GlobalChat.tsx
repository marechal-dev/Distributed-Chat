import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useAuthContext } from "../../providers/auth";
import { socketClient } from "../../lib/socketClient";
import z from "zod";
import Input from "../../components/Input";

const messageValidator = z.object({
  nickname: z.string(),
  message: z.string(),
});

type message = z.output<typeof messageValidator>;

const GlobalChat = () => {
  const socket = socketClient.connect()
  const {nickname} = useAuthContext()
  const [messages, setMessages] = useState<message[]>([])
  const [newMessage, setNewMessage] = useState<string>("")
  const [isTyping, setIsTyping] = useState<string>("")

  function sendMessages(){
    socket.emit('global.message.new', {nickname, message: newMessage})
    setNewMessage("")
    socket.emit("global.user.stop.typing")
  }

  function handleIsTyping(e:any){
    
    if (e.target.value){
      setNewMessage(e.target.value)
      socket.emit("global.users.typing")
    } else{
      socket.emit("global.user.stop.typing")
    }
  }

  useEffect(() => {
    function onMessage(messages: any) {
      const validatedMessage = messageValidator.parse(messages);
      setMessages((previous) => [...previous, validatedMessage]);
    }
    function onUsersTyping(value:string){
      setIsTyping(value)
    }
    function onUsersStopTyping(value:string | undefined){
      if (value){
      setIsTyping(value)}
    }

    socket.on('global.message.new', onMessage)
    socket.on('global.users.typing', onUsersTyping)
    socket.on('global.user.stop.typing', onUsersStopTyping)

    return(
      ()=>{socket.off('global.message.new', onMessage) 
      socket.off('global.users.typing', onUsersTyping)
      socket.off('global.user.stop.typing', onUsersStopTyping)}
      
      )
  }, [])
  
  return (
    <>
      <h1>{isTyping ? isTyping : "Ninguem esta digitando"}</h1>
      <Input
        type="text"
        label="text"
        title="Message"
        value={newMessage}
        onChange={handleIsTyping}
      />
      <Button title="Entrar" onClick={sendMessages} />
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.message}</li>
        ))}
      </ul>
    </>
  );
};

export default GlobalChat;
