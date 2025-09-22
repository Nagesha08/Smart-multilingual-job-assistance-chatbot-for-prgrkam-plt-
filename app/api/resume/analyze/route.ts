import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"

const resumeAnalysisSchema = z.object({
  overallScore: z.number().min(0).max(100).describe("Overall resume score out of 100"),
  sections: z.object({
    contact: z.object({
      score: z.number().min(0).max(100),
      feedback: z.string(),
      missing: z.array(z.string()),
    }),
    summary: z.object({
      score: z.number().min(0).max(100),
      feedback: z.string(),
      suggestions: z.array(z.string()),
    }),
    experience: z.object({
      score: z.number().min(0).max(100),
      feedback: z.string(),
      improvements: z.array(z.string()),
    }),
    skills: z.object({
      score: z.number().min(0).max(100),
      feedback: z.string(),
      recommendations: z.array(z.string()),
    }),
    education: z.object({
      score: z.number().min(0).max(100),
      feedback: z.string(),
      notes: z.array(z.string()),
    }),
  }),
  strengths: z.array(z.string()).describe("Key strengths found in the resume"),
  weaknesses: z.array(z.string()).describe("Areas that need improvement"),
  keywordOptimization: z.object({
    currentKeywords: z.array(z.string()),
    missingKeywords: z.array(z.string()),
    industryRelevance: z.number().min(0).max(100),
  }),
  atsCompatibility: z.object({
    score: z.number().min(0).max(100),
    issues: z.array(z.string()),
    recommendations: z.array(z.string()),
  }),
  actionItems: z.array(
    z.object({
      priority: z.enum(["high", "medium", "low"]),
      action: z.string(),
      description: z.string(),
    }),
  ),
})

export async function POST(req: Request) {
  const { resumeText, targetRole, industry } = await req.json()

  if (!resumeText) {
    return Response.json({ error: "Resume text is required" }, { status: 400 })
  }

  try {
    const { object: analysis } = await generateObject({
      model: openai("gpt-4"),
      schema: resumeAnalysisSchema,
      messages: [
        {
          role: "system",
          content: `You are an expert resume analyst and career coach. Analyze the provided resume thoroughly and provide detailed feedback across all sections. Consider ATS compatibility, keyword optimization, and industry standards.`,
        },
        {
          role: "user",
          content: `Please analyze this resume for a ${targetRole || "general"} position in the ${industry || "technology"} industry:

Resume Content:
${resumeText}

Provide a comprehensive analysis with specific, actionable feedback for improvement.`,
        },
      ],
    })

    return Response.json({
      success: true,
      analysis,
      targetRole: targetRole || "general",
      industry: industry || "technology",
      analyzedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Resume analysis error:", error)
    return Response.json(
      {
        error: "Failed to analyze resume",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
