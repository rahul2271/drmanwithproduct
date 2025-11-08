import { Leaf } from "lucide-react"

interface ChatBubbleProps {
  message: string
  role: "user" | "assistant"
  timestamp: Date
}

export function ChatBubble({ message, role, timestamp }: ChatBubbleProps) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
          role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground border border-border"
        }`}
      >
        {role === "assistant" && (
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-4 h-4" />
            <span className="text-xs font-semibold">Dr. Manpreet's AI</span>
          </div>
        )}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  )
}
