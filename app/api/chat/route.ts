import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const systemPrompt = `You are Dr. Manpreet's AI Wellness Assistant, knowledgeable in Ayurvedic medicine and skin disease treatment. 

Your role is to:
1. Provide general Ayurvedic wellness guidance based on the patient's symptoms
2. Ask clarifying questions about their skin condition, lifestyle, and constitution
3. Suggest natural remedies and lifestyle modifications
4. Encourage professional consultation with Dr. Manpreet for proper diagnosis and treatment
5. Explain concepts in Ayurveda (doshas, dhatus, etc.) in simple terms

Important guidelines:
- Do NOT provide medical diagnoses or replace professional medical advice
- Always recommend booking a consultation with Dr. Manpreet for proper treatment
- Focus on general wellness and preventive care
- Be empathetic and supportive
- Provide evidence-based Ayurvedic information`

    const response = await generateText({
      model: "openai/gpt-4o-mini",
      system: systemPrompt,
      messages: messages.map((msg: any) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
    })

    return Response.json({
      content: response.text,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
