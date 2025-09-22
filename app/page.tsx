import Link from "next/link"
import { JobSearchForm } from "@/components/job-search-form"
import { Chatbot } from "@/components/chatbot"

export default function HomePage() {
  return (
    <div className="bg-light min-h-screen">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-sm">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2" href="/">
            <img src="/logo.svg" alt="Logo" width="28" height="28" />
            <span>PGRKAM Portal</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="nav">
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

      {/* Hero Section */}
      <header className="bg-gradient-primary text-white py-5">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h1 className="display-5 fw-bold">Punjab Ghar Ghar Rozgar-style Portal</h1>
              <p className="lead">
                Find jobs, explore skill courses, and learn about government schemes — in one place.
              </p>
              <div className="d-flex gap-2 mt-3">
                <Link className="btn btn-warning btn-lg" href="/jobs">
                  <i className="fa-solid fa-briefcase"></i> Find Jobs
                </Link>
                <Link className="btn btn-outline-light btn-lg" href="/training">
                  <i className="fa-solid fa-graduation-cap"></i> Skill Courses
                </Link>
              </div>
              <div className="mt-3 p-3 bg-white bg-opacity-10 rounded">
                <div className="d-flex align-items-center gap-2">
                  <i className="fa-solid fa-robot fa-lg"></i>
                  <div>
                    <div className="fw-bold">AI Job Assistant</div>
                    <small>Get personalized job recommendations and career guidance</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 mt-4 mt-lg-0">
              <div className="card shadow-lg border-0">
                <div className="card-body p-4">
                  <h5 className="card-title">Quick Job Search</h5>
                  <JobSearchForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container my-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="fa-solid fa-briefcase me-2"></i>Latest Jobs
                </h5>
                <p className="text-muted">Browse current openings across Punjab from verified employers.</p>
                <Link href="/jobs" className="stretched-link">
                  Explore Jobs
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="fa-solid fa-graduation-cap me-2"></i>Skill Courses
                </h5>
                <p className="text-muted">Upskill with short-term courses mapped to industry demand.</p>
                <Link href="/training" className="stretched-link">
                  View Courses
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="fa-solid fa-hand-holding-heart me-2"></i>Govt. Schemes
                </h5>
                <p className="text-muted">Learn about employment-related schemes and benefits.</p>
                <Link href="/schemes" className="stretched-link">
                  See Schemes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

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
