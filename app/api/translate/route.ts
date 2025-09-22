import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

const supportedLanguages = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  zh: "Chinese",
  ja: "Japanese",
  ko: "Korean",
  ar: "Arabic",
  hi: "Hindi",
  ru: "Russian",
}

export async function POST(req: Request) {
  const { text, targetLanguage, sourceLanguage, context } = await req.json()

  if (!text || !targetLanguage) {
    return Response.json(
      {
        error: "Text and target language are required",
      },
      { status: 400 },
    )
  }

  if (!supportedLanguages[targetLanguage as keyof typeof supportedLanguages]) {
    return Response.json(
      {
        error: "Unsupported target language",
        supportedLanguages: Object.keys(supportedLanguages),
      },
      { status: 400 },
    )
  }

  try {
    const { text: translatedText } = await generateText({
      model: openai("gpt-4"),
      messages: [
        {
          role: "system",
          content: `You are a professional translator specializing in job-related content. Translate the provided text accurately while maintaining professional tone and context. Consider cultural nuances and industry-specific terminology.`,
        },
        {
          role: "user",
          content: `Translate the following ${context || "job-related"} text from ${sourceLanguage ? supportedLanguages[sourceLanguage as keyof typeof supportedLanguages] : "the source language"} to ${supportedLanguages[targetLanguage as keyof typeof supportedLanguages]}:

"${text}"

Maintain professional tone and ensure accuracy for job assistance context.`,
        },
      ],
      maxOutputTokens: 1000,
    })

    return Response.json({
      success: true,
      originalText: text,
      translatedText,
      sourceLanguage: sourceLanguage || "auto-detected",
      targetLanguage,
      context: context || "job-related",
    })
  } catch (error) {
    console.error("Translation error:", error)
    return Response.json(
      {
        error: "Translation failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return Response.json({
    supportedLanguages,
    endpoints: {
      translate: "POST /api/translate",
      languages: "GET /api/translate",
    },
  })
}
