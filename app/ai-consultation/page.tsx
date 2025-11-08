"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send, Loader2, Leaf, MessageCircle } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AiConsultationPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Namaste! I'm Dr. Manpreet's AI Consultation Assistant. I'm here to help you understand your skin condition and provide preliminary guidance based on Ayurvedic principles. Could you tell me what skin concerns brought you here today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      // Call API endpoint
      const response = await fetch("/api/ai-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I apologize, but I encountered an error. Please try again or contact Dr. Manpreet directly for personalized consultation.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">AI Consultation</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get preliminary guidance for your skin concerns from Dr. Manpreet's AI-powered consultation assistant,
            available 24/7.
          </p>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <Card className="border border-border bg-card flex flex-col h-[600px]">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground border border-border"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-2">
                        <Leaf className="w-4 h-4" />
                        <span className="text-xs font-semibold">Dr. Manpreet's AI Assistant</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground border border-border px-4 py-3 rounded-lg flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Dr. Manpreet's AI is typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Describe your skin concern..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  disabled={loading}
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || loading}
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Info Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 border border-border bg-card text-center">
              <h3 className="font-bold text-foreground mb-2">Always Available</h3>
              <p className="text-sm text-muted-foreground">Get guidance 24/7, whenever you need it</p>
            </Card>
            <Card className="p-6 border border-border bg-card text-center">
              <h3 className="font-bold text-foreground mb-2">Confidential</h3>
              <p className="text-sm text-muted-foreground">Your information is private and secure</p>
            </Card>
            <Card className="p-6 border border-border bg-card text-center">
              <h3 className="font-bold text-foreground mb-2">Expert Knowledge</h3>
              <p className="text-sm text-muted-foreground">Based on Dr. Manpreet's expertise</p>
            </Card>
          </div>

          {/* CTA */}
          <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20 text-center">
            <h3 className="font-bold text-foreground mb-2">Need Personalized Treatment?</h3>
            <p className="text-muted-foreground mb-4">
              The AI consultation provides preliminary guidance. For a complete diagnosis and personalized treatment
              plan, please book a consultation with Dr. Manpreet.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Book Consultation with Dr. Manpreet
            </Button>
          </div>
        </div>
      </section>

      {/* Sample Questions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">Sample Questions to Ask</h2>
            <p className="text-muted-foreground">Get ideas on what you can ask the AI assistant</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "What are the symptoms of psoriasis?",
              "How can Ayurveda help with eczema?",
              "What lifestyle changes help with acne?",
              "Is vitiligo treatable with Ayurveda?",
              "What's the difference between eczema and dermatitis?",
              "How long does Ayurvedic treatment usually take?",
              "Are there any side effects to Ayurvedic treatments?",
              "What's my Dosha constitution?",
            ].map((question, idx) => (
              <Card
                key={idx}
                className="p-4 border border-border bg-card cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setInput(question)}
              >
                <p className="text-foreground font-medium">{question}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
