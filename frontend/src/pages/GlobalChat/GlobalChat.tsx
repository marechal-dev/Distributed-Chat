import { useEffect, useRef, useState } from "react";
import z from "zod";
import { FiChevronLeft, FiGlobe } from "react-icons/fi";
import { GoRocket } from "react-icons/go";

import { socketClient, redundantSocketClient } from "../../lib/socketClients";
import { useAuthContext } from "../../providers/auth";
import Messages from "../../components/Messages";

import { Chat, Container, Footer, Header, Logo, Main } from "./styles";

const messageValidator = z.object({
  nickname: z.string(),
  message: z.string(),
});

type Message = z.output<typeof messageValidator>;

const socket = socketClient.connect();
const redundantSocket = redundantSocketClient.connect();

const GlobalChat = () => {
  const { nickname } = useAuthContext();
  const [usingFallbackServer, setUsingFallbackServer] =
    useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  // const [, setIsTyping] = useState<string>("");
  const conversationRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessages();
    }
  };

  const onConnectionError = () => {
    socket.close();
    setUsingFallbackServer(true);
  };

  function sendMessages() {
    if (newMessage) {
      if (usingFallbackServer) {
        redundantSocket.emit("global.message.new", {
          nickname,
          message: newMessage,
        });
        setNewMessage("");
        return;
      }

      socket.emit("global.message.new", { nickname, message: newMessage });
      setNewMessage("");
    }
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
    // function onUsersTyping(value: string) {
    //   setIsTyping(value);
    // }
    // function onUsersStopTyping(value: string | undefined) {
    //   if (value) {
    //     setIsTyping(value);
    //   }
    // }

    socket.on("connect_error", onConnectionError);
    socket.on("global.message.new", onMessage);
    redundantSocket.on("global.message.new", onMessage);

    return () => {
      socket.off("connect_error", onConnectionError);
      socket.off("global.message.new", onMessage);
      redundantSocket.off("global.message.new", onMessage);
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
              isMine={message.nickname === nickname}
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
