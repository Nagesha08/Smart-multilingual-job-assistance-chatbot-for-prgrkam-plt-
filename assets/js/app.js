// Minimal client-side logic for demo

async function loadJobs() {
  const res = await fetch('assets/data/jobs.json');
  const jobs = await res.json();
  renderJobs(jobs);
  document.getElementById('applyFilters')?.addEventListener('click', () => {
    const keyword = document.getElementById('fKeyword').value.toLowerCase();
    const location = document.getElementById('fLocation').value.toLowerCase();
    const type = document.getElementById('fType').value;
    const edu = document.getElementById('fEducation').value;
    const filtered = jobs.filter(j => {
      const matchKw = !keyword || (j.title + ' ' + j.company).toLowerCase().includes(keyword);
      const matchLoc = !location || j.location.toLowerCase().includes(location);
      const matchType = !type || j.type === type;
      const matchEdu = !edu || j.education === edu;
      return matchKw && matchLoc && matchType && matchEdu;
    });
    renderJobs(filtered);
  });
}

function renderJobs(list) {
  const wrap = document.getElementById('jobsContainer');
  if (!wrap) return;
  wrap.innerHTML = '';
  if (!list.length) {
    wrap.innerHTML = '<div class="alert alert-info">No jobs match your filters.</div>';
    return;
  }
  list.forEach(j => {
    const card = document.createElement('div');
    card.className = 'card border-0 shadow-sm';
    card.innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div>
            <h5 class="card-title mb-1">${j.title}</h5>
            <div class="text-muted small">${j.company} • ${j.location}</div>
          </div>
          <span class="badge text-bg-secondary align-self-start">${j.type}</span>
        </div>
        <p class="mt-3 mb-2 small">${j.summary}</p>
        <div class="d-flex gap-2 small text-muted">
          <span><i class="fa-solid fa-graduation-cap me-1"></i>${j.education}</span>
          <span><i class="fa-solid fa-indian-rupee-sign ms-3 me-1"></i>${j.salary}</span>
        </div>
        <div class="mt-3 d-flex gap-2">
          <a class="btn btn-primary btn-sm" href="#">Apply</a>
          <button class="btn btn-outline-secondary btn-sm" onclick="saveJob('${j.id}')">Save</button>
        </div>
      </div>`;
    wrap.appendChild(card);
  });
}

function saveJob(id) {
  const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
  if (!saved.includes(id)) saved.push(id);
  localStorage.setItem('savedJobs', JSON.stringify(saved));
  alert('Saved!');
  renderSavedJobs();
}

async function loadCourses() {
  const res = await fetch('assets/data/courses.json');
  const courses = await res.json();
  const wrap = document.getElementById('coursesContainer');
  if (!wrap) return;
  wrap.innerHTML = '';
  courses.forEach(c => {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    col.innerHTML = `
      <div class="card h-100 border-0 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${c.title}</h5>
          <p class="small text-muted">${c.provider}</p>
          <p class="mb-2">${c.summary}</p>
          <span class="badge text-bg-light">${c.duration}</span>
        </div>
      </div>`;
    wrap.appendChild(col);
  });
}

function renderSavedJobs() {
  const ul = document.getElementById('savedJobs');
  if (!ul) return;
  ul.innerHTML = '';
  const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
  if (!saved.length) {
    ul.innerHTML = '<li class="list-group-item">No saved jobs yet.</li>';
    return;
  }
  saved.forEach(id => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.textContent = 'Job #' + id;
    const btn = document.createElement('button');
    btn.className = 'btn btn-sm btn-outline-danger';
    btn.textContent = 'Remove';
    btn.onclick = () => {
      const arr = JSON.parse(localStorage.getItem('savedJobs') || '[]').filter(x => x !== id);
      localStorage.setItem('savedJobs', JSON.stringify(arr));
      renderSavedJobs();
    };
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

// Demo form handlers
function demoLogin(e) { e.preventDefault(); alert('This is a demo. Implement real auth.'); window.location = 'dashboard.html'; return false; }
function demoRegister(e) { e.preventDefault(); alert('Registered (demo). Implement backend.'); window.location = 'dashboard.html'; return false; }
function demoContact(e) { e.preventDefault(); alert('Message sent (demo).'); return false; }

// Page router
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('jobsContainer')) loadJobs();
  if (document.getElementById('coursesContainer')) loadCourses();
  renderSavedJobs();
});
