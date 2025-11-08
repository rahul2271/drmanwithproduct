"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { blogService } from "@/lib/blog-service"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  ImageIcon,
  VideoIcon,
  Loader,
  AlertCircle,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [selectionStart, setSelectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [imageAlt, setImageAlt] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [imageLoading, setImageLoading] = useState(false)
  const [error, setError] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getSelectedText = () => {
    return value.substring(selectionStart, selectionEnd)
  }

  const insertMarkdown = (before: string, after = "") => {
    const selected = getSelectedText()
    const newText = value.substring(0, selectionStart) + before + selected + after + value.substring(selectionEnd)
    onChange(newText)
    setTimeout(() => textareaRef.current?.focus(), 0)
  }

  const insertAtCursor = (text: string) => {
    const newText = value.substring(0, selectionStart) + text + value.substring(selectionEnd)
    onChange(newText)
    setTimeout(() => textareaRef.current?.focus(), 0)
  }

  const headingButtons = [
    { icon: Heading1, label: "H1", action: () => insertMarkdown("# ", "\n") },
    { icon: Heading2, label: "H2", action: () => insertMarkdown("## ", "\n") },
    { icon: Heading3, label: "H3", action: () => insertMarkdown("### ", "\n") },
    { icon: Heading4, label: "H4", action: () => insertMarkdown("#### ", "\n") },
  ]

  const formatButtons = [
    { icon: Bold, label: "Bold", action: () => insertMarkdown("**", "**") },
    { icon: Italic, label: "Italic", action: () => insertMarkdown("*", "*") },
    { icon: Underline, label: "Underline", action: () => insertMarkdown("<u>", "</u>") },
  ]

  const listButtons = [
    { icon: List, label: "Bullet List", action: () => insertMarkdown("- ") },
    { icon: ListOrdered, label: "Ordered List", action: () => insertMarkdown("1. ") },
  ]

  const blockButtons = [
    { icon: Quote, label: "Quote", action: () => insertMarkdown("> ", "") },
    { icon: Code, label: "Code Block", action: () => insertMarkdown("```\n", "\n```") },
  ]

  // Handle file upload from explorer
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setError("")
      setImageLoading(true)
      console.log("[v0] Uploading file:", file.name)

      const url = await blogService.uploadImage(file, "blog-content-images")
      console.log("[v0] File uploaded successfully:", url)

      setImageUrl(url)
      setShowImageModal(true)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to upload image"
      console.error("[v0] Upload error:", err)
      setError(errorMsg)
    } finally {
      setImageLoading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleInsertImage = () => {
    if (!imageUrl.trim()) {
      setError("Please enter an image URL")
      return
    }

    const markdown = `![${imageAlt || "Image"}](${imageUrl})`
    insertAtCursor(markdown)
    setImageUrl("")
    setImageAlt("")
    setShowImageModal(false)
    setError("")
  }

  const handleInsertVideo = () => {
    if (!videoUrl.trim()) {
      setError("Please enter a video URL")
      return
    }

    const videoMarkdown = `\n<video width="100%" controls>\n  <source src="${videoUrl}" type="video/mp4">\n  Your browser does not support the video tag.\n</video>\n`
    insertAtCursor(videoMarkdown)
    setVideoUrl("")
    setShowVideoModal(false)
    setError("")
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="border-b border-border bg-muted p-3 space-y-2">
        {/* Heading Tools */}
        <div className="flex flex-wrap gap-1 items-center">
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-background/50 border border-border/50">
            {headingButtons.map((btn) => {
              const Icon = btn.icon
              return (
                <Button
                  key={btn.label}
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={btn.action}
                  title={`Insert ${btn.label}`}
                  className="hover:bg-primary/20 h-8 px-2"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs ml-1">{btn.label}</span>
                </Button>
              )
            })}
          </div>

          {/* Format Tools */}
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-background/50 border border-border/50">
            {formatButtons.map((btn) => {
              const Icon = btn.icon
              return (
                <Button
                  key={btn.label}
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={btn.action}
                  title={btn.label}
                  className="hover:bg-primary/20 h-8 px-2"
                >
                  <Icon className="w-4 h-4" />
                </Button>
              )
            })}
          </div>

          {/* List Tools */}
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-background/50 border border-border/50">
            {listButtons.map((btn) => {
              const Icon = btn.icon
              return (
                <Button
                  key={btn.label}
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={btn.action}
                  title={btn.label}
                  className="hover:bg-primary/20 h-8 px-2"
                >
                  <Icon className="w-4 h-4" />
                </Button>
              )
            })}
          </div>

          {/* Block Tools */}
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-background/50 border border-border/50">
            {blockButtons.map((btn) => {
              const Icon = btn.icon
              return (
                <Button
                  key={btn.label}
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={btn.action}
                  title={btn.label}
                  className="hover:bg-primary/20 h-8 px-2"
                >
                  <Icon className="w-4 h-4" />
                </Button>
              )
            })}
          </div>

          {/* Media Tools */}
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-background/50 border border-border/50">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={imageLoading}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                disabled={imageLoading}
                title="Upload Image from Computer"
                className="hover:bg-primary/20 h-8 px-2 cursor-pointer"
                asChild
              >
                <span>
                  {imageLoading ? <Loader className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                </span>
              </Button>
            </label>

            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => setShowImageModal(true)}
              title="Insert Image URL"
              className="hover:bg-primary/20 h-8 px-2"
            >
              <ImageIcon className="w-4 h-4" />
              <span className="text-xs ml-1">URL</span>
            </Button>

            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => setShowVideoModal(true)}
              title="Insert Video"
              className="hover:bg-primary/20 h-8 px-2"
            >
              <VideoIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Info Text */}
        <p className="text-xs text-muted-foreground px-1">
          Markdown supported • Click upload icon to add images from your computer • Use toolbar buttons to format
          content
        </p>
      </div>

      {/* Editor Area */}
      <Tabs defaultValue="editor" className="w-full border-b border-border">
        <TabsList className="w-full justify-start rounded-none border-b">
          <TabsTrigger value="editor" className="rounded-none">
            Editor
          </TabsTrigger>
          <TabsTrigger value="preview" className="rounded-none">
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="m-0">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onSelect={(e) => {
              setSelectionStart(e.currentTarget.selectionStart)
              setSelectionEnd(e.currentTarget.selectionEnd)
            }}
            placeholder="Write your blog content here...

# Main Heading (H1)
## Sub Heading (H2)
### Smaller Heading (H3)
#### Even Smaller (H4)

Use **bold**, *italic*, and <u>underline</u> for formatting.

- Bullet point 1
- Bullet point 2

1. Numbered item
2. Second item

> This is a quote

\`inline code\`

\`\`\`
code block
\`\`\`"
            className="w-full p-4 min-h-96 resize-none focus:outline-none font-mono text-sm text-foreground bg-background"
          />
        </TabsContent>

        <TabsContent value="preview" className="m-0 p-4 min-h-96 prose prose-sm max-w-none overflow-auto">
          <PreviewContent content={value} />
        </TabsContent>
      </Tabs>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Insert Image</h3>

            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full mt-2 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Alt Text (for SEO & accessibility)</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Describe the image"
                  className="w-full mt-2 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
              </div>
              {imageUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  <img src={imageUrl || "/placeholder.svg"} alt="Preview" className="max-h-40 rounded" />
                </div>
              )}
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowImageModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleInsertImage} disabled={!imageUrl.trim()}>
                  Insert Image
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Insert Video</h3>

            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Video URL</label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://example.com/video.mp4"
                  className="w-full mt-2 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
              </div>
              <p className="text-xs text-muted-foreground">Supported formats: MP4, WebM, Ogg. Use HTTPS URLs</p>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowVideoModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleInsertVideo} disabled={!videoUrl.trim()}>
                  Insert Video
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function PreviewContent({ content }: { content: string }) {
  const renderMarkdown = (text: string) => {
    const lines = text.split("\n")
    const elements: React.ReactNode[] = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={i} className="text-3xl font-bold mt-6 mb-3">
            {line.substring(2)}
          </h1>,
        )
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-2xl font-bold mt-5 mb-2">
            {line.substring(3)}
          </h2>,
        )
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-xl font-bold mt-4 mb-2">
            {line.substring(4)}
          </h3>,
        )
      } else if (line.startsWith("#### ")) {
        elements.push(
          <h4 key={i} className="text-lg font-bold mt-3 mb-2">
            {line.substring(5)}
          </h4>,
        )
      } else if (line.startsWith("> ")) {
        elements.push(
          <blockquote key={i} className="border-l-4 border-primary pl-4 italic text-muted-foreground my-3">
            {line.substring(2)}
          </blockquote>,
        )
      } else if (line.startsWith("- ")) {
        elements.push(
          <li key={i} className="ml-4 list-disc">
            {line.substring(2)}
          </li>,
        )
      } else if (line.startsWith("1. ") || line.match(/^\d+\. /)) {
        const match = line.match(/^\d+\. (.*)/)
        elements.push(
          <li key={i} className="ml-4 list-decimal">
            {match?.[1] || line}
          </li>,
        )
      } else if (line.includes("![")) {
        const match = line.match(/!\[(.*?)\]$$(.*?)$$/)
        if (match) {
          elements.push(
            <img
              key={i}
              src={match[2] || "/placeholder.svg"}
              alt={match[1]}
              className="max-w-full h-auto rounded my-3 border border-border"
            />,
          )
        }
      } else if (line.startsWith("<video")) {
        elements.push(
          <div key={i} className="my-3">
            <video width="100%" controls className="rounded">
              <source src={line.match(/src="(.*?)"/)?.[1] || ""} type="video/mp4" />
            </video>
          </div>,
        )
      } else if (line.trim()) {
        elements.push(
          <p key={i} className="my-2">
            {line}
          </p>,
        )
      } else {
        elements.push(<div key={i} className="my-1" />)
      }
    }

    return elements
  }

  return <div>{renderMarkdown(content)}</div>
}
