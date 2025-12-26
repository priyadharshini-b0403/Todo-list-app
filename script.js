let tasks = [];
let celebrated = false;


function addtask() {
  const input = document.getElementById("taskinput");
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false, editing: false });
  input.value = "";
  renderTasks();
}


function renderTasks() {
  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="taskItem">
        <div class="task-left">
          <input type="checkbox"
            ${task.completed ? "checked" : ""}
            onchange="toggleComplete(${index})">

          ${
            task.editing
              ? `<input type="text"
                   class="task-text ${task.completed ? "completed" : ""}"
                   value="${task.text}"
                   onblur="updateText(${index}, this.value)"
                   autofocus>`
              : `<span class="task-text ${task.completed ? "completed" : ""}">
                   ${task.text}
                 </span>`
          }
        </div>

        <div class="icons">
          <span onclick="editTask(${index})">✏️</span>
          <span onclick="deleteTask(${index})">🗑️</span>
        </div>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateStats();
  checkCelebrate();
}


function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  celebrated = false;
  renderTasks();
}


function editTask(index) {
  tasks[index].editing = true;
  renderTasks();
}


function updateText(index, value) {
  if (value.trim() !== "") {
    tasks[index].text = value.trim();
  }
  tasks[index].editing = false;
  renderTasks();
}


function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}


function updateStats() {
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;

  document.getElementById("numbers").innerText = `${completed}/${total}`;
  document.getElementById("progress").style.width =
    total === 0 ? "0%" : `${(completed / total) * 100}%`;
}


function checkCelebrate() {
  if (tasks.length > 0 && tasks.every(t => t.completed) && !celebrated) {
    celebrated = true;
    setTimeout(() => {
      alert("🎉 Congratulations! You achieved your goal!");
    }, 300);
  }
}


// Handle form submit so Enter key and the + button both add a task
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    addtask();
  });
}

// Keep backwards-compatible button click handling (optional)
const newBtn = document.getElementById("newtask");
if (newBtn) {
  newBtn.addEventListener("click", e => {
    e.preventDefault();
    addtask();
  });
}
