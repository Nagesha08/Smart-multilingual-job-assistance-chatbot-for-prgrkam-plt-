export function renderToolResult(toolName: string, result: any) {
  switch (toolName) {
    case "jobSearch":
      return (
        <div>
          <div className="fw-bold mb-2">Found {result.totalFound} jobs:</div>
          {result.results?.map((job: any, index: number) => (
            <div key={index} className="border-bottom pb-2 mb-2">
              <div className="fw-bold">{job.title}</div>
              <div className="text-muted small">
                {job.company} • {job.location}
              </div>
              <div className="text-success small">{job.salary}</div>
              <div className="small mt-1">{job.description}</div>
              <div className="mt-1">
                {job.requirements?.map((req: string, i: number) => (
                  <span key={i} className="badge bg-light text-dark me-1 small">
                    {req}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )

    case "resumeAnalysis":
      return (
        <div>
          <div className="d-flex align-items-center mb-2">
            <span className="fw-bold me-2">Resume Score:</span>
            <span className="badge bg-success">{result.score}/100</span>
          </div>

          <div className="mb-2">
            <div className="fw-bold small text-success">Strengths:</div>
            <ul className="small mb-0">
              {result.strengths?.map((strength: string, index: number) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>

          <div className="mb-2">
            <div className="fw-bold small text-warning">Improvements:</div>
            <ul className="small mb-0">
              {result.improvements?.map((improvement: string, index: number) => (
                <li key={index}>{improvement}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="fw-bold small text-info">Keyword Suggestions:</div>
            <div className="mt-1">
              {result.keywordSuggestions?.map((keyword: string, index: number) => (
                <span key={index} className="badge bg-info text-white me-1 small">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      )

    case "interviewPrep":
      return (
        <div>
          <div className="fw-bold mb-2">Interview Questions ({result.interviewType}):</div>
          <ol className="small mb-3">
            {result.questions?.map((question: string, index: number) => (
              <li key={index} className="mb-1">
                {question}
              </li>
            ))}
          </ol>

          <div className="fw-bold small mb-1">Tips:</div>
          <ul className="small mb-0">
            {result.tips?.map((tip: string, index: number) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )

    default:
      return <div className="small">{JSON.stringify(result, null, 2)}</div>
  }
}
