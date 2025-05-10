/**
 * Clase Task:
 * - id: identificador único (timestamp)
 * - text: contenido de la tarea
 * - completed: booleano de estado
 */
class Task {
  constructor(id, text, completed = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }
}

/**
 * Clase UI: maneja interacción y DOM
 */
class UI {
  /** Inicializa la UI: carga tareas y enlaza eventos */
  static init() {
    UI.loadTasksFromLocal();     // Carga persistencia
    UI.bindEvents();             // Eventos UI
  }

  /** Registra eventos globales */
  static bindEvents() {
    // Envío del formulario para añadir
    document.getElementById('task-form')
      .addEventListener('submit', UI.handleAdd);
    // Clic en filtros
    document.querySelectorAll('.filter-btn')
      .forEach(btn => btn.addEventListener('click', UI.handleFilter));
  }

  /** Lee tareas de localStorage y las muestra */
  static loadTasksFromLocal() {
    const tasks = Store.getTasks();
    tasks.forEach(task => UI.addTaskToList(task));
  }

  /** Añade una nueva tarea */
  static handleAdd(e) {
    e.preventDefault();                // Evita recarga
    const input = document.getElementById('task-input');
    const text = input.value.trim();   // Sin espacios
    if (!text) return;                 // No vacío

    const task = new Task(Date.now().toString(), text);
    Store.addTask(task);               // Persistencia
    UI.addTaskToList(task, true);      // Render con anim
    input.value = '';                  // Limpia campo
  }

  /** Aplica filtro según botón clicado */
  static handleFilter(e) {
    document.querySelectorAll('.filter-btn')
      .forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    UI.renderFiltered(e.target.dataset.filter);
  }

  /** Vuelve a dibujar la lista según filtro */
  static renderFiltered(filter) {
    const list = document.getElementById('task-list');
    list.innerHTML = '';               // Limpia todo
    Store.getTasks()
      .filter(t => filter === 'all' || (filter === 'completed') === t.completed)
      .forEach(task => UI.addTaskToList(task));
  }

  /** Construye el elemento <li> de cada tarea */
  static addTaskToList(task, animate = false) {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) li.classList.add('completed');
    li.dataset.id = task.id;
    if (animate) li.classList.add('enter');

    // HTML interno: texto + botones
    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <button class="complete-btn">✓</button>
      <button class="delete-btn">×</button>
    `;

    // Evento completar
    li.querySelector('.complete-btn')
      .addEventListener('click', () => UI.toggleComplete(task.id, li));
    // Evento eliminar
    li.querySelector('.delete-btn')
      .addEventListener('click', () => UI.removeTask(task.id, li));

    // Swipe-to-delete (touch)
    let startX;
    li.addEventListener('touchstart', e => { startX = e.changedTouches[0].pageX; });
    li.addEventListener('touchend', e => {
      const diff = e.changedTouches[0].pageX - startX;
      if (Math.abs(diff) > 100) UI.removeTask(task.id, li);
    });

    document.getElementById('task-list').appendChild(li);
  }

  /** Alterna estado completo e clase */
  static toggleComplete(id, li) {
    Store.toggleTask(id);
    li.classList.toggle('completed');
  }

  /** Elimina tarea con animación */
  static removeTask(id, li) {
    li.classList.add('exit');
    li.addEventListener('animationend', () => {
      Store.removeTask(id);
      li.remove();
    });
  }
}

/**
 * Clase Store: maneja localStorage (CRUD)
 */
class Store {
  // Devuelve array de tareas (JSON.parse)
  static getTasks() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  }
  // Añade tarea y actualiza localStorage
  static addTask(task) {
    const tasks = Store.getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  // Elimina por ID
  static removeTask(id) {
    let tasks = Store.getTasks();
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  // Cambia completed y guarda
  static toggleTask(id) {
    const tasks = Store.getTasks();
    tasks.forEach(t => { if (t.id === id) t.completed = !t.completed; });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Inicializa al cargar el DOM
document.addEventListener('DOMContentLoaded', UI.init);

// Registro de Service Worker (ruta absoluta)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .catch(err => console.error('ServiceWorker no registrado:', err));
  });
} 