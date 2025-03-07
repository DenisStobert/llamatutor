import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import FinalInputArea from "./FinalInputArea";
import { FaClipboard, FaShareAlt } from "react-icons/fa";
import Image from "next/image";
import simpleLogo from "../public/simple-logo.png";

const LoadingState = () => (
  <div className="flex justify-center items-center">
    <span className="text-gray-500">Loading...</span>
  </div>
);

const Chat = ({
  messages,
  disabled,
  promptValue,
  setPromptValue,
  setMessages,
  handleChat,
  topic,
}: {
  messages: { role: string; content: string }[];
  disabled: boolean;
  promptValue: string;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  setMessages: React.Dispatch<React.SetStateAction<{ role: string; content: string }[]>>;
  handleChat: () => void;
  topic: string;
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const [didScrollToBottom, setDidScrollToBottom] = useState(true);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (didScrollToBottom) {
      scrollToBottom();
    }
  }, [didScrollToBottom, messages, scrollToBottom]);

  useEffect(() => {
    const el = scrollableContainerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setDidScrollToBottom(scrollTop + clientHeight >= scrollHeight);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClipboardAction = async (action: 'copy' | 'share') => {
    const chatContent = messages.map(msg => msg.content).join("\n");
    if (action === 'copy') {
      try {
        await navigator.clipboard.writeText(chatContent);
        setCopiedMessage(true);
        setTimeout(() => setCopiedMessage(false), 2000);
      } catch (err) {
        setCopiedMessage(false);
        alert("Copy failed. Your browser might not support clipboard access.");
      }
    } else if (action === 'share') {
      if (navigator.share) {
        try {
          await navigator.share({
            title: "Chat Conversation",
            text: chatContent,
            url: window.location.href,
          });
        } catch (err) {
          console.error("Error sharing:", err);
          alert("Error sharing the content. Please try again later.");
        }
      } else {
        alert("Sharing is not supported on this device or browser.");
      }
    }
  };

  return (
    <div className="flex grow flex-col gap-4 overflow-hidden">
      <div className="flex grow flex-col overflow-hidden lg:p-4">
        <p className="uppercase text-gray-900">
          <b>Topic: </b>
          {topic}
        </p>
        <div ref={scrollableContainerRef} className="mt-2 overflow-y-scroll rounded-lg border border-solid border-[#C2C2C2] bg-white px-5 lg:p-7">
          {messages.length > 2 ? (
            <div className="prose-sm max-w-5xl lg:prose lg:max-w-full">
              {messages.slice(2).map((message, index) => (
                <div key={index} className="relative w-full">
                  {message.role === "assistant" && (
                    <Image src={simpleLogo} alt="" className="absolute left-0 top-0 !my-0 size-7" loading="lazy" />
                  )}
                  <ReactMarkdown className="w-full pl-10">{message.content}</ReactMarkdown>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <LoadingState />
          )}
        </div>
        {messages.length > 0 && (
          <div className="flex justify-end mt-4 space-x-4">
            <button onClick={() => handleClipboardAction('copy')} className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white border border-gray-300 shadow-md text-gray-700 hover:bg-gray-100">
              <FaClipboard />
              <span>Copy</span>
            </button>
            <button onClick={() => handleClipboardAction('share')} className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white border border-gray-300 shadow-md text-blue-500 hover:bg-blue-50">
              <FaShareAlt />
              <span>Share</span>
            </button>
          </div>
        )}
        {copiedMessage && <div className="fixed bottom-4 left-4 bg-green-500 text-white p-3 rounded-md shadow-md">Copied to clipboard!</div>}
      </div>

      <div className="bg-white lg:p-4">
        <FinalInputArea
          disabled={disabled}
          promptValue={promptValue}
          setPromptValue={setPromptValue}
          handleChat={handleChat}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
};

export default Chat;
