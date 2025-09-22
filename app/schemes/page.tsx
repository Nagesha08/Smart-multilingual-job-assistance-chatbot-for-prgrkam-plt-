import Link from "next/link"
import { Chatbot } from "@/components/chatbot"

export default function SchemesPage() {
  const schemes = [
    {
      id: "1",
      title: "Punjab Ghar Ghar Rozgar Scheme",
      description:
        "Employment generation program for youth of Punjab with skill development and job placement assistance.",
      eligibility: "Age 18-35, Resident of Punjab, Minimum 8th pass",
      benefits: "Free skill training, Job placement assistance, Monthly stipend during training",
      howToApply: "Visit nearest employment exchange or apply online through official portal",
    },
    {
      id: "2",
      title: "Skill Development Program",
      description: "Short-term skill development courses aligned with industry requirements.",
      eligibility: "Age 18-45, Any educational background",
      benefits: "Free training, Certification, Placement support, Tool kit",
      howToApply: "Register at skill development centers or online portal",
    },
    {
      id: "3",
      title: "Self Employment Scheme",
      description: "Financial assistance for starting own business or enterprise.",
      eligibility: "Age 21-40, Minimum 10th pass, Business plan required",
      benefits: "Loan up to ₹10 lakhs, Subsidized interest rates, Mentorship support",
      howToApply: "Submit business plan at district employment office",
    },
    {
      id: "4",
      title: "Women Empowerment Program",
      description: "Special employment and skill development program for women.",
      eligibility: "Women aged 18-50, Any educational background",
      benefits: "Free training, Childcare support, Flexible timings, Job guarantee",
      howToApply: "Contact women development office or apply online",
    },
  ]

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
        <h2>Government Schemes</h2>
        <p className="text-muted">Learn about employment-related schemes and benefits available for job seekers.</p>

        <div className="accordion" id="schemes">
          {schemes.map((scheme, index) => (
            <div key={scheme.id} className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#scheme${scheme.id}`}
                  aria-expanded={index === 0}
                >
                  {scheme.title}
                </button>
              </h2>
              <div
                id={`scheme${scheme.id}`}
                className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                data-bs-parent="#schemes"
              >
                <div className="accordion-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <h6>Description</h6>
                      <p>{scheme.description}</p>
                    </div>
                    <div className="col-md-6">
                      <h6>Eligibility</h6>
                      <p>{scheme.eligibility}</p>
                    </div>
                    <div className="col-md-6">
                      <h6>Benefits</h6>
                      <p>{scheme.benefits}</p>
                    </div>
                    <div className="col-12">
                      <h6>How to Apply</h6>
                      <p>{scheme.howToApply}</p>
                      <button className="btn btn-primary">Apply Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
