"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Chatbot } from "@/components/chatbot"

interface User {
  id: string
  name: string
  email: string
  phone: string
  education: string
  city: string
}

interface SavedJob {
  id: string
  title: string
  company: string
  location: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
        return
      }

      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)

        // Mock saved jobs data
        setSavedJobs([
          { id: "1", title: "Software Developer", company: "Tech Corp", location: "Chandigarh" },
          { id: "2", title: "Data Analyst", company: "Analytics Inc", location: "Mohali" },
        ])
      } else {
        localStorage.removeItem("token")
        router.push("/login")
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    router.push("/")
  }

  const calculateProfileCompletion = () => {
    if (!user) return 0
    let completed = 0
    const fields = [user.name, user.email, user.phone, user.education, user.city]
    fields.forEach((field) => {
      if (field && field.trim()) completed++
    })
    return Math.round((completed / fields.length) * 100)
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

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
                <span className="navbar-text me-3">Welcome, {user?.name}</span>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={logout}>
                  <i className="fa-solid fa-sign-out-alt"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="container py-5">
        <h2 className="mb-3">Candidate Dashboard</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-muted">Profile Completion</h6>
                <div className="progress mb-2" role="progressbar" aria-label="Profile completion">
                  <div className="progress-bar" style={{ width: `${calculateProfileCompletion()}%` }}>
                    {calculateProfileCompletion()}%
                  </div>
                </div>
                <small className="text-muted">Complete your profile to get better job recommendations</small>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-muted">Saved Jobs</h6>
                <ul className="list-group list-group-flush small">
                  {savedJobs.length > 0 ? (
                    savedJobs.map((job) => (
                      <li key={job.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{job.title}</strong>
                          <br />
                          <small className="text-muted">
                            {job.company} • {job.location}
                          </small>
                        </div>
                        <Link href={`/jobs/${job.id}`} className="btn btn-sm btn-outline-primary">
                          View
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-muted">
                      No saved jobs yet. <Link href="/jobs">Browse jobs</Link> to get started.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="row g-4 mt-2">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h6 className="text-muted mb-3">Profile Information</h6>
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>Name:</strong> {user?.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {user?.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {user?.phone || "Not provided"}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Education:</strong> {user?.education}
                    </p>
                    <p>
                      <strong>City:</strong> {user?.city || "Not provided"}
                    </p>
                  </div>
                </div>
                <button className="btn btn-primary">Edit Profile</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Chatbot />
    </div>
  )
}
