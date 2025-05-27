import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";
import EcoMascot from "../EcoMascot";
import { toast } from "sonner";
import { sendChatMessage } from "../../lib/api"; // Import the API client

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatBotProps {
  onBack: () => void;
}

const ChatBot = ({ onBack }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [typingMessage, setTypingMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingMessage]);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "🌻 Hi there! I'm Ecopal! What's your name?",
        },
      ]);
    }
  }, []);

  const typeMessage = (fullMessage: string) => {
    setIsTyping(true);
    setTypingMessage("");
    
    let currentIndex = 0;
    const typingSpeed = 50; // milliseconds per character
    
    const typeInterval = setInterval(() => {
      if (currentIndex < fullMessage.length) {
        setTypingMessage(fullMessage.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTypingMessage("");
        
        // Add the complete message to the messages array
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: fullMessage,
          },
        ]);
      }
    }, typingSpeed);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput("");
    
    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // If this is the first message, extract name
      const isFirstMessage = !name;
      if (isFirstMessage) {
        const extractedName = userMessage.trim().split(/\s+/)[0];
        setName(extractedName);
      }
      
      // Call the actual API 
      const response = await sendChatMessage(userMessage, isFirstMessage);
      
      // Start typing animation
      typeMessage(response);
      
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const [mascotImage, setMascotImage] = useState("");

  const getMascotImage = () => {
    const images = [
      "/lovable-uploads/f65f8a63-0172-4b0c-9f71-907eb0defff8.png",
      "/lovable-uploads/b4310b3b-b786-4def-969c-be3dfd5a4fe0.png",
      "/lovable-uploads/598b4b4c-5006-4e4c-8b45-f5e4aabf0b80.png"
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  // Set initial mascot image and change it less frequently
  useEffect(() => {
    if (!mascotImage) {
      setMascotImage(getMascotImage());
    }
  }, []);

  // Change mascot image only when user sends a new message (not during typing)
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1]?.role === "user") {
      setMascotImage(getMascotImage());
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          className="eco-button-secondary p-2 rounded-full"
          aria-label="Go back"
        >
          <ArrowLeft />
        </button>
        <h2 className="text-2xl font-bold text-ecoBlue-dark">Chat with Ecopal</h2>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white rounded-2xl p-4 shadow-md flex-1 overflow-y-auto mb-4 border-2 border-ecoGreen-light">
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.role === "user" ? "chat-bubble-user" : "chat-bubble-bot"
                }`}
              >
                {message.content.split('\n').map((line, lineIndex) => (
                  <div key={lineIndex}>{line}</div>
                ))}
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble-bot">
                {typingMessage.split('\n').map((line, lineIndex) => (
                  <div key={lineIndex}>{line}</div>
                ))}
                <span className="animate-pulse">|</span>
              </div>
            )}
            {isLoading && !isTyping && (
              <div className="chat-bubble-bot">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="mb-4 flex justify-center">
          <EcoMascot 
            image={mascotImage} 
            animation={isTyping ? "none" : "float"}
            size="md"
          />
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about nature, animals, or the environment..."
            className="flex-1 p-4 rounded-full border-2 border-ecoGreen focus:outline-none focus:border-ecoGreen-dark"
            disabled={isLoading || isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim() || isTyping}
            className="eco-button-primary p-4 rounded-full disabled:opacity-50"
            aria-label="Send message"
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
