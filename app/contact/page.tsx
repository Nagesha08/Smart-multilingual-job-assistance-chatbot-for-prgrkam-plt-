"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Chatbot } from "@/components/chatbot"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Mock form submission - in production, this would send to an API
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setFormData({ name: "", email: "", message: "" })

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
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

      <section className="container py-5" style={{ maxWidth: "720px" }}>
        <h2>Contact</h2>
        <p className="text-muted">
          Get in touch with us for any queries or support regarding employment opportunities.
        </p>

        <div className="card border-0 shadow-sm">
          <div className="card-body">
            {success && (
              <div className="alert alert-success" role="alert">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input name="name" className="form-control" required value={formData.name} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="row g-4 mt-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <i className="fa-solid fa-phone fa-2x text-primary mb-3"></i>
                <h6>Phone</h6>
                <p className="text-muted">+91-172-1234567</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <i className="fa-solid fa-envelope fa-2x text-primary mb-3"></i>
                <h6>Email</h6>
                <p className="text-muted">support@pgrkam.gov.in</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <i className="fa-solid fa-map-marker-alt fa-2x text-primary mb-3"></i>
                <h6>Address</h6>
                <p className="text-muted">Sector 17, Chandigarh, Punjab</p>
              </div>
            </div>
          </div>
        </div>
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
