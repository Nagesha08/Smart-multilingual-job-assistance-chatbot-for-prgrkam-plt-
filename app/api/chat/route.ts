import { groq } from "@ai-sdk/groq"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages, language = "en" } = await req.json()

    const systemPrompt = getSystemPrompt(language)

    const result = await streamText({
      model: groq("llama-3.1-70b-versatile"),
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      maxSteps: 3,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

function getSystemPrompt(language: string): string {
  const prompts = {
    en: `You are a helpful job assistance chatbot for PGRKAM (Punjab Government employment portal). You help users with:
    - Job searching and career advice in Punjab
    - Resume analysis and improvement
    - Interview preparation and tips
    - Government job schemes and opportunities
    - Skill development recommendations
    
    Always be encouraging, professional, and provide actionable advice. Focus on opportunities in Punjab and government sector jobs.`,

    hi: `आप PGRKAM (पंजाब सरकार रोजगार पोर्टल) के लिए एक सहायक नौकरी सहायता चैटबॉट हैं। आप उपयोगकर्ताओं की मदद करते हैं:
    - पंजाब में नौकरी खोजना और करियर सलाह
    - रिज्यूमे विश्लेषण और सुधार
    - इंटरव्यू की तैयारी और सुझाव
    - सरकारी नौकरी योजनाएं और अवसर
    - कौशल विकास की सिफारिशें`,

    pa: `ਤੁਸੀਂ PGRKAM (ਪੰਜਾਬ ਸਰਕਾਰ ਰੁਜ਼ਗਾਰ ਪੋਰਟਲ) ਲਈ ਇੱਕ ਸਹਾਇਕ ਨੌਕਰੀ ਸਹਾਇਤਾ ਚੈਟਬੋਟ ਹੋ। ਤੁਸੀਂ ਉਪਭੋਗਤਾਵਾਂ ਦੀ ਮਦਦ ਕਰਦੇ ਹੋ:
    - ਪੰਜਾਬ ਵਿੱਚ ਨੌਕਰੀ ਖੋਜਣਾ ਅਤੇ ਕਰੀਅਰ ਸਲਾਹ
    - ਰਿਜ਼ਿਊਮੇ ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਸੁਧਾਰ
    - ਇੰਟਰਵਿਊ ਦੀ ਤਿਆਰੀ ਅਤੇ ਸੁਝਾਅ
    - ਸਰਕਾਰੀ ਨੌਕਰੀ ਸਕੀਮਾਂ ਅਤੇ ਮੌਕੇ`,
  }

  return prompts[language as keyof typeof prompts] || prompts.en
}
