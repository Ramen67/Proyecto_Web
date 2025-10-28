// ======= Tabs (Login / Register) =======
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ======= Dark mode toggle =======
const toggleBtn = document.getElementById('themeToggle');
if(toggleBtn) {
  const body = document.body;
  const header = document.querySelector('header');
  const cards = document.querySelectorAll('.card');

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if(header) header.classList.toggle('dark-mode');
    cards.forEach(c => c.classList.toggle('dark-mode'));
  });
}

// ======= Task list =======
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('task-count');
let total = taskCount ? parseInt(taskCount.textContent) || 0 : 0;

if(taskForm && taskList) {
  taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const titleInput = document.getElementById('task-title');
    const dateInput = document.getElementById('task-date');
    const title = titleInput.value.trim();
    const date = dateInput.value || 'Sin fecha';
    if(!title) return;

    const item = document.createElement('div');
    item.className = 'task-item';
    item.innerHTML = `
      <div class="form-check mt-1">
        <input class="form-check-input" type="checkbox">
        <label class="form-check-label fw-semibold">${title}</label>
      </div>
      <div class="task-meta ms-2">Vence: ${date}</div>
      <div class="ms-auto d-flex gap-2">
        <button class="btn btn-sm btn-ghost edit">✏️</button>
        <button class="btn btn-sm btn-ghost delete">🗑️</button>
      </div>
    `;
    taskList.appendChild(item);
    setTimeout(() => item.classList.add('show'), 50);
    total++;
    if(taskCount) taskCount.textContent = total;
    taskForm.reset();
  });

  // Eventos de la lista
  taskList.addEventListener('click', e => {
    const item = e.target.closest('.task-item');
    if(!item) return;

    if(e.target.matches('.delete')) {
      item.classList.add('fade-out');
      setTimeout(() => {
        item.remove();
        total--;
        if(taskCount) taskCount.textContent = total;
      }, 300);
    }
    if(e.target.matches('.form-check-input')) {
      item.classList.toggle('completed', e.target.checked);
    }
    if(e.target.matches('.edit')) {
      const modal = new bootstrap.Modal(document.getElementById('editModal'));
      modal.show();
    }
  });

  // Filtros visuales
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}
