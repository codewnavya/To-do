document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if(storedTasks){
        storeTasks.forEach((task) => tasks.push(task));
        updateTaskList();
        updateProgress();
    }
})

let tasks = []; //yaha pe it'll be stored

const storeTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if(text){
        tasks.push({text:text, completed: false});
        taskInput.value = "";
                    updateTaskList();
                    updateProgress();
                    storeTasks();
    }
};

const updateTaskList = () => {
    const tasklist = document.getElementById("task-list");
    const emptyState = document.getElementById("empty-state");
    tasklist.innerHTML = "";

    
    if (tasks.length === 0) {
                emptyState.style.display = "block";
                return;
            }
            
            emptyState.style.display = "none";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
        <div class="task ${task.completed ? "completed" : ""}">
        <input type="checkbox" class="chebox" ${task.completed ? "checked" : ""}>
        <p>${task.text}</p>
        </div>
        <div class="icons">
        <i class = "fa-solid fa-pen-to-square" onClick="editTask(${index})"></i>
        <i class = "fa-solid fa-trash" onClick="deleteTask(${index})"></i>
        </div>
        </div>
        `;
        listItem.addEventListener('change', () => toggleTaskComplete(index));
        tasklist.append(listItem);
    });
}; 

const toggleTaskComplete = (index) => {
            tasks[index].completed = !tasks[index].completed;
            updateTaskList();
            updateProgress();
            storeTasks();
        };

        const editTask = (index) => {
            const taskInput = document.getElementById("taskInput");
            taskInput.value = tasks[index].text;
            tasks.splice(index,1);
                updateTaskList();
                storeTasks();
            };

        const deleteTask = (index) => {
                            tasks.splice(index, 1);
                        updateTaskList();
                        updateProgress();
                        storeTasks();
                    };

        const updateProgress = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    
    document.getElementById('progress').style.width = percentage + '%';
    document.getElementById('numbers').textContent = `${completedTasks} / ${totalTasks}`;

    if(completedTasks === totalTasks && totalTasks > 0){
        confettiPop();
    }
};




const btn = document.getElementById('newTasks');
btn.addEventListener('click', function(e){
    e.preventDefault();
    addTask();
});

document.getElementById("taskInput").addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        e.preventDefault();
        addTask();
    }
});

const confettiPop = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}