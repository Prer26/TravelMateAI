import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TypingText from "@/components/TypingText";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import robot from "@/assets/robot.png";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

const ChatPage = () => {
  const navigate = useNavigate();

  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingId, setTypingId] = useState<string | null>(null);
  const [robotText, setRobotText] = useState("Hi! I'm your travel buddy 🤖");

  const bottomRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((c) => c.id === activeChatId);

  // Load chats
  useEffect(() => {
    const saved = localStorage.getItem("chats");
    if (saved) {
      const parsed = JSON.parse(saved);
      setChats(parsed);
      setActiveChatId(parsed[0]?.id);
    } else {
      createChat();
    }
  }, []);

  // Save chats
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  // Scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat]);

  // Create chat
  const createChat = () => {
    const newChat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [],
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  // Delete chat
  const deleteChat = (id: string) => {
    const updated = chats.filter((c) => c.id !== id);
    setChats(updated);
    setActiveChatId(updated[0]?.id);
  };

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || !activeChatId) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      text: input,
    };

    updateChat(userMsg);
    setInput("");
    setLoading(true);
    setRobotText("Thinking... ✨");

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: "ai",
        text: data.reply,
      };

      updateChat(aiMsg);
      setTypingId(aiMsg.id);
      setRobotText("Typing your plan 🧳");
    } catch {
      setRobotText("Server error 😢");
    }

    setLoading(false);
  };

  const updateChat = (msg: Message) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: [...chat.messages, msg],
              title:
                chat.messages.length === 0
                  ? msg.text.slice(0, 20)
                  : chat.title,
            }
          : chat
      )
    );
  };

  return (
    <div className="flex h-screen bg-background">

      {/* SIDEBAR */}
      <div className="w-64 bg-white/50 backdrop-blur-xl border-r p-4">
        {/* BACK BUTTON */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Button>

        <Button onClick={createChat} className="mb-4 gradient-primary">
          <Plus /> New Chat
        </Button>

        <div className="flex-1 overflow-y-auto space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-2 rounded flex justify-between items-center cursor-pointer ${
                activeChatId === chat.id
                  ? "bg-primary text-white"
                  : "hover:bg-muted"
              }`}
            >
              <span onClick={() => setActiveChatId(chat.id)}>
                {chat.title}
              </span>

              <Trash2
                size={16}
                onClick={() => deleteChat(chat.id)}
                className="hover:text-red-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex flex-col flex-1">

        {/* HEADER */}
        <header className="glass-card border-b px-4 py-3">
          <h1 className="text-lg font-semibold text-foreground">
            TravelMate AI ✈️
          </h1>
        </header>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-2xl mx-auto space-y-4">

            {activeChat?.messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                    msg.role === "user"
                      ? "chat-bubble-user"
                      : "chat-bubble-ai"
                  }`}
                >
                  {msg.role === "ai" ? (
                    typingId === msg.id ? (
                      <TypingText
                        text={msg.text}
                        onDone={() => setTypingId(null)}
                      />
                    ) : (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text}
                      </ReactMarkdown>
                    )
                  ) : (
                    msg.text
                  )}
                </div>
              </motion.div>
            ))}

            {loading && (
              <div className="chat-bubble-ai px-4 py-2">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* INPUT */}
        <div className="px-4 pb-4">
          <div className="max-w-2xl mx-auto glass-card rounded-xl flex gap-2 p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your next trip..."
              className="flex-1 bg-transparent outline-none px-2"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <Button onClick={sendMessage}>
              <Send size={16} />
            </Button>
          </div>
        </div>

      </div>

      {/* ROBOT (RIGHT SIDE CLEAN) */}
      <div className="hidden lg:flex w-72 items-center justify-center relative">
        <div className="absolute w-60 h-60 bg-pink-300 opacity-30 blur-3xl rounded-full"></div>

        <img src={robot} className="w-40 robot-float z-10" />

        <div className="absolute bottom-10 glass-card px-3 py-2 text-sm">
          {robotText}
        </div>
      </div>

    </div>
  );
};

export default ChatPage;