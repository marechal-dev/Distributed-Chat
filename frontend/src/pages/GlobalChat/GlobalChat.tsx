import React, { useEffect, useRef, useState } from "react";
import z from "zod";
import { FiChevronLeft, FiGlobe } from "react-icons/fi";
import { GoRocket } from "react-icons/go";

import { socketClient, redundantSocketClient } from "../../lib/socketClients";
import { useAuthContext } from "../../providers/auth";
import Messages from "../../components/Messages";

import { Chat, Container, Footer, Header, Logo, Main } from "./styles";

const incomingMessageSchemaValidator = z.object({
  nickname: z.string(),
  message: z.string(),
});

type Message = z.output<typeof incomingMessageSchemaValidator>;

const GlobalChat = () => {
  const { nickname } = useAuthContext();

  const [usingFallbackServer, setUsingFallbackServer] =
    useState<boolean>(false);

  const [message, setMessage] = useState<string>("");
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);

  const conversationRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (message) {
      if (usingFallbackServer) {
        redundantSocketClient.emit("global.message.new", {
          nickname,
          message: message,
        });
        setMessage("");
        return;
      }

      socketClient.emit("global.message.new", { nickname, message: message });
      setMessage("");
    }
  };

  const onPressEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    socketClient.connect();
    redundantSocketClient.connect();

    return () => {
      socketClient.disconnect();
      redundantSocketClient.disconnect();
    };
  }, []);

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }

    const onReceiveNewMessage = (messages: unknown) => {
      const validatedMessage = incomingMessageSchemaValidator.parse(messages);
      setReceivedMessages((previous) => [...previous, validatedMessage]);
    };

    const onConnectionError = () => {
      socketClient.disconnect();
      setUsingFallbackServer(true);
    };

    socketClient.on("connect_error", onConnectionError);
    socketClient.on("global.message.new", onReceiveNewMessage);
    redundantSocketClient.on("global.message.new", onReceiveNewMessage);

    return () => {
      socketClient.off("connect_error", onConnectionError);
      socketClient.off("global.message.new", onReceiveNewMessage);
      redundantSocketClient.off("global.message.new", onReceiveNewMessage);
    };
  }, [receivedMessages]);

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
          {receivedMessages.map((message, index) => (
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={onPressEnterKey}
          />
          <button onClick={handleSendMessage}>
            <GoRocket />
          </button>
        </Footer>
      </Chat>
    </Container>
  );
};

export default GlobalChat;
