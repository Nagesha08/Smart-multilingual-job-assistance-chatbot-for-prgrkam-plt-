import type { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const keyword = searchParams.get("keyword") || searchParams.get("q") || ""
  const location = searchParams.get("location") || ""
  const type = searchParams.get("type") || ""
  const education = searchParams.get("education") || ""
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  // Mock job data - in production, this would connect to job APIs
  const allJobs = [
    {
      id: "1",
      title: "Junior Clerk",
      company: "Punjab Government",
      location: "Chandigarh",
      type: "Full-time",
      education: "12th",
      salary: "₹15,000 - ₹25,000",
      description: "Handle administrative tasks, file management, and data entry for government office.",
      requirements: ["Basic Computer Skills", "Hindi/Punjabi", "Data Entry"],
      posted: "2024-01-15",
      postedDate: "2 days ago",
    },
    {
      id: "2",
      title: "Software Developer",
      company: "Tech Solutions Pvt Ltd",
      location: "Mohali",
      type: "Full-time",
      education: "Graduate",
      salary: "₹35,000 - ₹55,000",
      description: "Develop web applications using modern technologies. Fresh graduates welcome.",
      requirements: ["JavaScript", "React", "Node.js", "SQL"],
      posted: "2024-01-14",
      postedDate: "3 days ago",
    },
    {
      id: "3",
      title: "Data Entry Operator",
      company: "InfoTech Services",
      location: "Ludhiana",
      type: "Part-time",
      education: "10th",
      salary: "₹12,000 - ₹18,000",
      description: "Enter data accurately into computer systems and maintain records.",
      requirements: ["Typing Speed 30 WPM", "MS Office", "Attention to Detail"],
      posted: "2024-01-13",
      postedDate: "4 days ago",
    },
    {
      id: "4",
      title: "Assistant Teacher",
      company: "Bright Future School",
      location: "Amritsar",
      type: "Full-time",
      education: "Graduate",
      salary: "₹20,000 - ₹30,000",
      description: "Assist in teaching primary school students and help with classroom management.",
      requirements: ["B.Ed Preferred", "Good Communication", "Patience with Children"],
      posted: "2024-01-12",
      postedDate: "5 days ago",
    },
    {
      id: "5",
      title: "Sales Executive",
      company: "Marketing Solutions",
      location: "Jalandhar",
      type: "Full-time",
      education: "12th",
      salary: "₹18,000 - ₹35,000",
      description: "Generate leads, meet clients, and achieve sales targets. Incentives available.",
      requirements: ["Good Communication", "Sales Experience", "Two Wheeler"],
      posted: "2024-01-11",
      postedDate: "6 days ago",
    },
    {
      id: "6",
      title: "Accountant",
      company: "Finance Corp",
      location: "Patiala",
      type: "Full-time",
      education: "Graduate",
      salary: "₹25,000 - ₹40,000",
      description: "Maintain financial records, prepare reports, and handle tax compliance.",
      requirements: ["Tally", "GST Knowledge", "Excel", "Commerce Background"],
      posted: "2024-01-10",
      postedDate: "1 week ago",
    },
    {
      id: "7",
      title: "Customer Service Representative",
      company: "Call Center Solutions",
      location: "Chandigarh",
      type: "Full-time",
      education: "12th",
      salary: "₹16,000 - ₹22,000",
      description: "Handle customer queries via phone and email. Night shift allowance available.",
      requirements: ["English Communication", "Computer Basic", "Patience"],
      posted: "2024-01-09",
      postedDate: "1 week ago",
    },
    {
      id: "8",
      title: "Delivery Executive",
      company: "Quick Delivery Services",
      location: "Mohali",
      type: "Full-time",
      education: "10th",
      salary: "₹15,000 - ₹25,000",
      description: "Deliver packages to customers. Own vehicle required. Fuel allowance provided.",
      requirements: ["Valid Driving License", "Own Vehicle", "Local Area Knowledge"],
      posted: "2024-01-08",
      postedDate: "1 week ago",
    },
    {
      id: "9",
      title: "Lab Technician",
      company: "Medical Diagnostics",
      location: "Ludhiana",
      type: "Full-time",
      education: "Diploma",
      salary: "₹20,000 - ₹28,000",
      description: "Conduct medical tests and maintain laboratory equipment.",
      requirements: ["Medical Lab Technology", "Lab Experience", "Attention to Detail"],
      posted: "2024-01-07",
      postedDate: "1 week ago",
    },
    {
      id: "10",
      title: "Security Guard",
      company: "Security Services Ltd",
      location: "Amritsar",
      type: "Full-time",
      education: "10th",
      salary: "₹12,000 - ₹18,000",
      description: "Provide security services for commercial buildings. Night shifts available.",
      requirements: ["Physical Fitness", "Security Training", "Alert Nature"],
      posted: "2024-01-06",
      postedDate: "2 weeks ago",
    },
  ]

  // Filter jobs based on search criteria
  const filteredJobs = allJobs.filter((job) => {
    const matchesKeyword =
      !keyword ||
      job.title.toLowerCase().includes(keyword.toLowerCase()) ||
      job.company.toLowerCase().includes(keyword.toLowerCase()) ||
      job.requirements.some((req) => req.toLowerCase().includes(keyword.toLowerCase()))

    const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase())

    const matchesType = !type || job.type.toLowerCase() === type.toLowerCase()

    const matchesEducation = !education || job.education.toLowerCase() === education.toLowerCase()

    return matchesKeyword && matchesLocation && matchesType && matchesEducation
  })

  // Pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex)

  return Response.json({
    jobs: paginatedJobs,
    pagination: {
      page,
      limit,
      total: filteredJobs.length,
      totalPages: Math.ceil(filteredJobs.length / limit),
      hasNext: endIndex < filteredJobs.length,
      hasPrev: page > 1,
    },
    filters: {
      keyword,
      location,
      type,
      education,
    },
  })
}

export async function POST(req: Request) {
  const { title, company, location, type, experience, salary, description, requirements } = await req.json()

  // Mock job posting - in production, this would save to database
  const newJob = {
    id: Date.now().toString(),
    title,
    company,
    location,
    type,
    experience,
    salary,
    description,
    requirements,
    posted: new Date().toISOString().split("T")[0],
    remote: location.toLowerCase().includes("remote"),
  }

  return Response.json(
    {
      success: true,
      job: newJob,
      message: "Job posted successfully",
    },
    { status: 201 },
  )
}
