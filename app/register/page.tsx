"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    education: "Graduate",
    city: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Store token and redirect to dashboard
        localStorage.setItem("token", data.token)
        router.push("/dashboard")
      } else {
        setError(data.error || "Registration failed")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            <img src="/logo.jpg" alt="Logo" width="28" height="28" />
            <span>PGRKAM Portal</span>
          </Link>
        </div>
      </nav>

      <section className="container py-5" style={{ maxWidth: "720px" }}>
        <h2 className="mb-3">Candidate Registration</h2>
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <input name="name" className="form-control" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="col-md-6">
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
                <div className="col-md-6">
                  <label className="form-label">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <input name="phone" className="form-control" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Education</label>
                  <select name="education" className="form-select" value={formData.education} onChange={handleChange}>
                    <option>10th</option>
                    <option>12th</option>
                    <option>Diploma</option>
                    <option>Graduate</option>
                    <option>Postgraduate</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <input name="city" className="form-control" value={formData.city} onChange={handleChange} />
                </div>
              </div>
              <button className="btn btn-success mt-3" type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
