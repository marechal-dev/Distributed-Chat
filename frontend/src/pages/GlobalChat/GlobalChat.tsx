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

type Message = z.output<typeof messageValidator>;

const GlobalChat = () => {
  const socket = socketClient.connect();
  const { nickname } = useAuthContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  function sendMessages() {
    socket.emit("global.message.new", { nickname, message: newMessage });
    setNewMessage("");
  }

  useEffect(() => {
    function onMessage(messages: any) {
      const validatedMessage = messageValidator.parse(messages);
      setMessages((previous) => [...previous, validatedMessage]);
    }

    socket.on("global.message.new", onMessage);

    return () => {
      socket.off("global.message.new", onMessage);
    };
  }, []);

  return (
    <>
      <Input
        type="text"
        label="text"
        title="Message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
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
