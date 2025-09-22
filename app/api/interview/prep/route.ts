import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"

const interviewPrepSchema = z.object({
  questions: z.object({
    behavioral: z.array(
      z.object({
        question: z.string(),
        category: z.string(),
        tips: z.array(z.string()),
        starExample: z.string().optional(),
      }),
    ),
    technical: z.array(
      z.object({
        question: z.string(),
        difficulty: z.enum(["easy", "medium", "hard"]),
        topics: z.array(z.string()),
        hints: z.array(z.string()),
      }),
    ),
    situational: z.array(
      z.object({
        question: z.string(),
        scenario: z.string(),
        keyPoints: z.array(z.string()),
      }),
    ),
  }),
  companyResearch: z.object({
    keyAreas: z.array(z.string()),
    questionsToAsk: z.array(z.string()),
    redFlags: z.array(z.string()),
  }),
  preparation: z.object({
    timeline: z.array(
      z.object({
        timeframe: z.string(),
        tasks: z.array(z.string()),
      }),
    ),
    materials: z.array(z.string()),
    practiceAreas: z.array(z.string()),
  }),
  dayOfInterview: z.object({
    checklist: z.array(z.string()),
    whatToBring: z.array(z.string()),
    commonMistakes: z.array(z.string()),
  }),
})

export async function POST(req: Request) {
  const { jobTitle, company, interviewType, experience, industry } = await req.json()

  if (!jobTitle) {
    return Response.json({ error: "Job title is required" }, { status: 400 })
  }

  try {
    const { object: prep } = await generateObject({
      model: openai("gpt-4"),
      schema: interviewPrepSchema,
      messages: [
        {
          role: "system",
          content: `You are an expert interview coach with extensive experience helping candidates prepare for job interviews across various industries and roles. Provide comprehensive, practical interview preparation guidance.`,
        },
        {
          role: "user",
          content: `Create a comprehensive interview preparation guide for:
- Job Title: ${jobTitle}
- Company: ${company || "Not specified"}
- Interview Type: ${interviewType || "General"}
- Experience Level: ${experience || "Mid-level"}
- Industry: ${industry || "Technology"}

Include behavioral, technical, and situational questions with detailed preparation strategies, company research guidance, and day-of-interview tips.`,
        },
      ],
    })

    return Response.json({
      success: true,
      preparation: prep,
      jobDetails: {
        title: jobTitle,
        company: company || "Not specified",
        type: interviewType || "General",
        experience: experience || "Mid-level",
        industry: industry || "Technology",
      },
      createdAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Interview prep error:", error)
    return Response.json(
      {
        error: "Failed to generate interview preparation",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// GET endpoint for quick interview questions
export async function GET(req: Request) {
  const url = new URL(req.url)
  const jobTitle = url.searchParams.get("jobTitle")
  const count = Number.parseInt(url.searchParams.get("count") || "5")
  const type = url.searchParams.get("type") || "general"

  const quickQuestions = {
    general: [
      "Tell me about yourself.",
      "Why are you interested in this position?",
      "What are your greatest strengths?",
      "Where do you see yourself in 5 years?",
      "Why should we hire you?",
    ],
    behavioral: [
      "Tell me about a time you overcame a challenge.",
      "Describe a situation where you had to work with a difficult person.",
      "Give an example of when you showed leadership.",
      "Tell me about a time you failed and what you learned.",
      "Describe a time you had to adapt to change.",
    ],
    technical: [
      "Walk me through your problem-solving process.",
      "How do you stay updated with industry trends?",
      "Describe your experience with [relevant technology].",
      "How would you approach [job-specific scenario]?",
      "What tools and methodologies do you prefer and why?",
    ],
  }

  const questions = quickQuestions[type as keyof typeof quickQuestions] || quickQuestions.general
  const selectedQuestions = questions.slice(0, count)

  return Response.json({
    questions: selectedQuestions,
    type,
    jobTitle: jobTitle || "General",
    count: selectedQuestions.length,
  })
}
