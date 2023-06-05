import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../providers/auth";
import { socketClient } from "../../lib/socketClient";
import z from "zod";
import { Chat, Container, Footer, Header, Logo, Main } from "./styles";

import Messages from "../../components/Messages";
import { FiChevronLeft, FiGlobe } from "react-icons/fi";
import { GoRocket } from "react-icons/go";

const messageValidator = z.object({
  nickname: z.string(),
  message: z.string(),
});

type message = z.output<typeof messageValidator>;

const GlobalChat = () => {
  const socket = socketClient.connect();
  const { nickname } = useAuthContext();
  const [messages, setMessages] = useState<message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [, setIsTyping] = useState<string>("");
  const conversationRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessages();
    }
  };

  function sendMessages() {
    if (newMessage) {
      socket.emit("global.message.new", { nickname, message: newMessage });
      setNewMessage("");
    }
    console.log("ruim");
  }

  // function handleIsTyping(e:any){
  //   if (e.target.value){
  //     setNewMessage(e.target.value)
  //     socket.emit("global.users.typing")
  //   }
  // }

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }

    function onMessage(messages: any) {
      const validatedMessage = messageValidator.parse(messages);
      setMessages((previous) => [...previous, validatedMessage]);
    }
    function onUsersTyping(value: string) {
      setIsTyping(value);
    }
    function onUsersStopTyping(value: string | undefined) {
      if (value) {
        setIsTyping(value);
      }
    }

    socket.on("global.message.new", onMessage);
    socket.on("global.users.typing", onUsersTyping);
    socket.on("global.user.stop.typing", onUsersStopTyping);

    return () => {
      socket.off("global.message.new", onMessage);
      socket.off("global.users.typing", onUsersTyping);
      socket.off("global.user.stop.typing", onUsersStopTyping);
    };
  }, [messages]);

  return (
    <Container>
      <Chat>
        <Header>
          <div id="buttonBack">
            <FiChevronLeft color="white" />
          </div>
          <Logo>
            <FiGlobe color="white" />
          </Logo>
        </Header>
        <Main ref={conversationRef}>
          {messages.map((message, index) => (
            <Messages
              key={index}
              name={message.nickname}
              message={message.message}
              isMine={true}
            />
          ))}
        </Main>
        <Footer>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={sendMessages}>
            <GoRocket />
          </button>
        </Footer>
      </Chat>
    </Container>
  );
};

export default GlobalChat;
