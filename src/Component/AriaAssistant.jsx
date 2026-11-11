"use client";

import { useEffect, useState } from "react";

import AriaLogo from "@/assets/logo.png";
import Image from "next/image";

const suggestions = [
  "How do payments work?",
  "What are the fees?",
  "How do I post a requirement?",
  "How do I find opportunities?",
  "Talk to a human",
];

export default function AriaAssistant({ onSend }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm Aria, Freevance's virtual assistant. Ask me about requirements, opportunities, responses, milestones, payments or fees.",
    },
  ]);
  const [isSending, setIsSending] = useState(false);

  // Listen for the Meet Aria button event
  useEffect(() => {
    const openAriaAssistant = () => {
      setIsOpen(true);
    };

    window.addEventListener("open-aria-assistant", openAriaAssistant);

    return () => {
      window.removeEventListener("open-aria-assistant", openAriaAssistant);
    };
  }, []);
  const sendMessage = async (text) => {
    const question = text.trim();

    if (!question || isSending) return;

    setMessages((previous) => [...previous, { role: "user", text: question }]);

    setMessage("");

    if (!onSend) {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: "Aria's chat interface is ready. Connect the onSend prop to your assistant API to enable automated replies.",
        },
      ]);
      return;
    }

    setIsSending(true);

    try {
      const reply = await onSend(question);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            typeof reply === "string"
              ? reply
              : reply?.text || "I couldn't generate a response.",
        },
      ]);
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(message);
  };

  return (
    <div className="font-sans">
      {/* Chat panel */}
      <section
        id="aria-panel"
        role="dialog"
        aria-label="Aria chat assistant"
        aria-hidden={!isOpen}
        className={`
          fixed bottom-24 right-4 z-[100]
          flex h-[min(560px,calc(100dvh-120px))]
          w-[min(380px,calc(100vw-32px))]
          flex-col overflow-hidden rounded-2xl
          border border-gray-200 bg-white text-gray-800
          shadow-2xl transition-all duration-200
          dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100
          sm:right-6
          ${
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible pointer-events-none translate-y-3 opacity-0"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-blue-900 px-4 py-4 text-white dark:bg-blue-950">
          <div className="flex h-13 w-13 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
            <Image
              src={AriaLogo}
              alt="Aria logo"
              className="h-9 w-9 object-contain"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-semibold">Aria</h2>
            <p className="text-xs text-blue-100">Freevance assistant</p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div
          id="aria-messages"
          aria-live="polite"
          className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4 dark:bg-gray-950"
        >
          {messages.map((item, index) => (
            <div
              key={`${index}-${item.role}`}
              className={`flex ${
                item.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`
                  max-w-[88%] whitespace-pre-wrap break-words
                  rounded-2xl px-3.5 py-3 text-sm leading-relaxed
                  ${
                    item.role === "user"
                      ? "rounded-br-sm bg-blue-900 text-white dark:bg-blue-600"
                      : "rounded-bl-sm border border-gray-200 bg-white text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  }
                `}
              >
                {item.text}
              </div>
            </div>
          ))}

          {isSending && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Aria is typing…
            </p>
          )}
        </div>

        {/* Suggested questions */}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 border-t border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => sendMessage(suggestion)}
                disabled={isSending}
                className="rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-left text-xs text-blue-900 transition hover:bg-blue-100 disabled:opacity-50 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200 dark:hover:bg-blue-900"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Message input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
        >
          <input
            id="aria-input"
            type="text"
            autoComplete="off"
            aria-label="Message Aria"
            placeholder="Type your question…"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-950"
          />

          <button
            type="submit"
            aria-label="Send message"
            disabled={!message.trim() || isSending}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-900 text-lg text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            ➤
          </button>
        </form>
      </section>

      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? "Close Aria chat" : "Chat with Aria"}
        aria-expanded={isOpen}
        aria-controls="aria-panel"
        className="fixed bottom-6 right-4 z-[100] flex items-center gap-2 rounded-full bg-white px-3 py-2 text-btn-primary shadow-xl transition hover:-translate-y-0.5 hover:bg-btn-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-btn-primary dark:text-white dark:focus-visible:ring-offset-gray-900 sm:right-6"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
          <Image
            src={AriaLogo}
            alt="Aria logo"
            className="h-6 w-6 object-contain"
          />
        </div>
        <span className="text-md font-semibold">
          {isOpen ? "Close Aria" : "Ask Aria"}
        </span>
      </button>
    </div>
  );
}
