"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Chatbot } from "@/components/chatbot"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  education: string
  salary: string
  description: string
  postedDate: string
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    type: "",
    education: "",
  })
  const searchParams = useSearchParams()

  useEffect(() => {
    // Initialize filters from URL params
    setFilters({
      keyword: searchParams.get("q") || "",
      location: searchParams.get("location") || "",
      type: searchParams.get("type") || "",
      education: searchParams.get("education") || "",
    })

    fetchJobs()
  }, [searchParams])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filters.keyword) params.set("keyword", filters.keyword)
      if (filters.location) params.set("location", filters.location)
      if (filters.type) params.set("type", filters.type)
      if (filters.education) params.set("education", filters.education)

      const response = await fetch(`/api/jobs/search?${params.toString()}`)
      const data = await response.json()
      setJobs(data.jobs || [])
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const applyFilters = () => {
    fetchJobs()
  }

  return (
    <div className="bg-light min-h-screen">
      {/* Navigation - Same as homepage */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-sm">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2" href="/">
            <img src="/logo.jpg" alt="Logo" width="28" height="28" />
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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Job Listings</h2>
          <div>
            <Link href="/dashboard" className="btn btn-outline-primary">
              <i className="fa-solid fa-gauge"></i> Dashboard
            </Link>
          </div>
        </div>

        <div className="row g-4">
          {/* Filters Sidebar */}
          <aside className="col-lg-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h6 className="text-uppercase text-muted">Filters</h6>
                <div className="mb-2">
                  <label className="form-label">Keyword</label>
                  <input
                    name="keyword"
                    className="form-control"
                    placeholder="e.g., Clerk"
                    value={filters.keyword}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Location</label>
                  <input
                    name="location"
                    className="form-control"
                    placeholder="e.g., Mohali"
                    value={filters.location}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Type</label>
                  <select name="type" className="form-select" value={filters.type} onChange={handleFilterChange}>
                    <option value="">Any</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Education</label>
                  <select
                    name="education"
                    className="form-select"
                    value={filters.education}
                    onChange={handleFilterChange}
                  >
                    <option value="">Any</option>
                    <option>10th</option>
                    <option>12th</option>
                    <option>Diploma</option>
                    <option>Graduate</option>
                    <option>Postgraduate</option>
                  </select>
                </div>
                <button onClick={applyFilters} className="btn btn-primary w-100">
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <div className="col-lg-9">
            <div className="vstack gap-3">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : jobs.length > 0 ? (
                jobs.map((job) => (
                  <div key={job.id} className="card border-0 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="card-title mb-1">{job.title}</h5>
                          <p className="text-muted mb-2">
                            {job.company} • {job.location}
                          </p>
                          <div className="d-flex gap-2 mb-2">
                            <span className="badge bg-primary">{job.type}</span>
                            <span className="badge bg-secondary">{job.education}</span>
                          </div>
                          <p className="card-text">{job.description}</p>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold text-success">{job.salary}</div>
                          <small className="text-muted">{job.postedDate}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-5">
                  <p className="text-muted">No jobs found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Chatbot />
    </div>
  )
}
