"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Chatbot } from "@/components/chatbot"

interface Course {
  id: string
  title: string
  provider: string
  duration: string
  level: string
  description: string
  skills: string[]
  fee: string
}

export default function TrainingPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock course data - in production, this would come from an API
    const mockCourses: Course[] = [
      {
        id: "1",
        title: "Basic Computer Skills",
        provider: "Punjab Skill Development",
        duration: "3 months",
        level: "Beginner",
        description: "Learn essential computer skills including MS Office, internet usage, and email.",
        skills: ["MS Word", "MS Excel", "Internet", "Email"],
        fee: "Free",
      },
      {
        id: "2",
        title: "Data Entry & Typing",
        provider: "Skill India",
        duration: "2 months",
        level: "Beginner",
        description: "Improve typing speed and accuracy for data entry jobs.",
        skills: ["Typing Speed", "Data Entry", "Accuracy", "MS Office"],
        fee: "₹2,000",
      },
      {
        id: "3",
        title: "Tally Accounting",
        provider: "Commerce Institute",
        duration: "4 months",
        level: "Intermediate",
        description: "Complete Tally course with GST and accounting principles.",
        skills: ["Tally Prime", "GST", "Accounting", "Financial Reports"],
        fee: "₹5,000",
      },
      {
        id: "4",
        title: "Web Development Basics",
        provider: "Tech Training Center",
        duration: "6 months",
        level: "Beginner",
        description: "Learn HTML, CSS, and JavaScript to build websites.",
        skills: ["HTML", "CSS", "JavaScript", "Web Design"],
        fee: "₹8,000",
      },
      {
        id: "5",
        title: "Digital Marketing",
        provider: "Marketing Academy",
        duration: "3 months",
        level: "Intermediate",
        description: "Learn social media marketing, SEO, and online advertising.",
        skills: ["Social Media", "SEO", "Google Ads", "Content Marketing"],
        fee: "₹6,000",
      },
      {
        id: "6",
        title: "Mobile Repair Technician",
        provider: "Technical Institute",
        duration: "4 months",
        level: "Beginner",
        description: "Learn to repair smartphones and tablets. Practical training included.",
        skills: ["Hardware Repair", "Software Issues", "Troubleshooting", "Customer Service"],
        fee: "₹7,500",
      },
    ]

    setTimeout(() => {
      setCourses(mockCourses)
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="bg-light min-h-screen">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-sm">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2" href="/">
            <img src="/logo.svg" alt="Logo" width="28" height="28" />
            <span>PGRKAM Portal</span>
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" href="/jobs">
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/training">
                  Skill Courses
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/schemes">
                  Schemes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-light ms-lg-3" href="/login">
                  <i className="fa-solid fa-user"></i> Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-warning ms-lg-2" href="/register">
                  <i className="fa-solid fa-id-card"></i> Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="container py-5">
        <h2>Skill Courses</h2>
        <p className="text-muted">Discover short-term courses to boost employability.</p>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row g-3">
            {courses.map((course) => (
              <div key={course.id} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="text-muted mb-2">{course.provider}</p>
                    <div className="d-flex gap-2 mb-2">
                      <span className="badge bg-primary">{course.duration}</span>
                      <span className="badge bg-secondary">{course.level}</span>
                    </div>
                    <p className="card-text small">{course.description}</p>
                    <div className="mb-2">
                      <strong>Skills:</strong>
                      <div className="mt-1">
                        {course.skills.map((skill, index) => (
                          <span key={index} className="badge bg-light text-dark me-1 mb-1">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-success">{course.fee}</span>
                      <button className="btn btn-primary btn-sm">Enroll Now</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-5 py-4 bg-white border-top">
        <div className="container small text-muted d-flex flex-column flex-md-row justify-content-between">
          <div>© 2025 Demo Employment Portal. For educational use only.</div>
          <div className="text-md-end">
            <Link className="me-3" href="/privacy">
              Privacy
            </Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  )
}
