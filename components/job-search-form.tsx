"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function JobSearchForm() {
  const [formData, setFormData] = useState({
    q: "",
    location: "",
    type: "",
    education: "",
  })
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    Object.entries(formData).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    router.push(`/jobs?${params.toString()}`)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-2">
        <div className="col-12 col-md-6">
          <input
            className="form-control"
            name="q"
            placeholder="Keyword (e.g., Clerk)"
            value={formData.q}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-md-6">
          <input
            className="form-control"
            name="location"
            placeholder="Location (e.g., Ludhiana)"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-md-6">
          <select className="form-select" name="type" value={formData.type} onChange={handleChange}>
            <option value="">Job Type</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
          </select>
        </div>
        <div className="col-12 col-md-6">
          <select className="form-select" name="education" value={formData.education} onChange={handleChange}>
            <option value="">Education</option>
            <option>10th</option>
            <option>12th</option>
            <option>Diploma</option>
            <option>Graduate</option>
            <option>Postgraduate</option>
          </select>
        </div>
      </div>
      <button className="btn btn-primary w-100 mt-3" type="submit">
        Search
      </button>
    </form>
  )
}
