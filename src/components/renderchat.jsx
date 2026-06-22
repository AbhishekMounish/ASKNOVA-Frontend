import { Title, Paper } from "@mantine/core";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../../mycontext";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { useEffect, useRef, useState } from "react";
import remarkGfm from "remark-gfm";
import "./renderchat.css";

export default function RenderChat() {
  const { newchat, prevchats, reply } = useAuth();

  const bottomRef = useRef(null);
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (reply == null) {
      setLatestReply(null);
      return;
    }

    const content = reply.split(" ");

    let idx = 0;

    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));
      idx++;

      if (idx >= content.length) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [reply]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [prevchats, latestReply]);

  const markdownClass = `
    text-left
    text-[0.9rem]
    leading-7
    prose
    prose-invert
    prose-headings:text-white
    prose-p:text-zinc-200
    prose-strong:text-white
    prose-code:text-violet-300
    prose-pre:bg-[#1e1e1e]
    prose-li:text-zinc-200
    max-w-none
    prose-table:border
    prose-th:border
    prose-td:border
  `;

  return (
    <>
      {newchat && (
        <div className="flex justify-center mt-20">
          <Title order={1} c="white">
            Start a New Chat!
          </Title>
        </div>
      )}

      <div className="max-w-[700px] mx-auto px-6 py-8">
        {prevchats?.map((chat, idx) => (
          <div
            key={idx}
            className={`mb-6 ${
              chat.role === "user"
                ? "flex justify-end"
                : "text-left"
            }`}
          >
            {chat.role === "user" ? (
              <Paper
                bg="#323232"
                radius="md"
                p="md"
                className="
                  text-white
                  max-w-[500px]
                  w-fit
                  break-words
                "
              >
                {chat.content}
              </Paper>
            ) : (
              <div
                className={`${markdownClass} ${
                  chat.content?.startsWith("[ERROR]")
                    ? "text-red-400"
                    : "text-white"
                }`}
              >
                <ReactMarkdown
                  rehypePlugins={[rehypeHighlight]}
                  remarkPlugins={[remarkGfm]}
                >
                  {chat.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        ))}

        {latestReply !== null && (
          <div
            key="typing"
            className="mb-6 text-left"
          >
            <div
              className={`${markdownClass} ${
                latestReply?.startsWith("[ERROR]")
                  ? "text-red-400"
                  : "text-white"
              }`}
            >
              <ReactMarkdown
                rehypePlugins={[rehypeHighlight]}
                remarkPlugins={[remarkGfm]}
              >
                {latestReply}
              </ReactMarkdown>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </>
  );
}