// module to create tasks

import displayTasks from "./displayTasks.js";
import { saveProjects } from "./localStorage.js";
import { currProjects } from "./index.js";

function createTasks(project) {
    const tasks = document.getElementById("tasks");
        const newTask = document.createElement("div");
        newTask.className = "newTaskForm";
        newTask.innerHTML = `
            <div class="formMain">
                <div class="required">
                    <input class="taskTitle" type="text" placeholder="Task Name" required>
                    <input class="dueDate" type="date">
                    <select class="priority">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div class="notRequired">
                    <textarea class="taskDesc" rows="3" placeholder="Optional Description"></textarea>
                </div>
            </div>
            <div class="taskBtns">
                <button class="cancel">Cancel</button>
                <button class="addTask">Add Task</button>
            </div>
        `
        tasks.appendChild(newTask);
    
        const addTaskBtn = tasks.querySelector(".addTask");
        const cancelTaskBtn = tasks.querySelector(".cancel");

        addTaskBtn.addEventListener("click", () => {
            const taskTitle = tasks.querySelector(".taskTitle").value;
            const desc = tasks.querySelector(".taskDesc").value;
            const priority = tasks.querySelector(".priority").value;
            const dueDate = tasks.querySelector(".dueDate").value;
    
            if (!taskTitle || !dueDate) return;
    
            const task = { taskTitle, desc, priority, dueDate };
            project.tasks.push(task);
    
            // newTask.querySelector(".taskTitle").value = "";
            // newTask.querySelector(".taskDesc").value = "";
            // newTask.querySelector(".priority").value = "";
            // newTask.querySelector(".dueDate").value = "";

            saveProjects(currProjects);
            displayTasks(project);
        });

        cancelTaskBtn.addEventListener("click", () => {
            newTask.querySelector(".taskTitle").value = "";
            newTask.querySelector(".taskDesc").value = "";
            newTask.querySelector(".priority").value = "Low";
            newTask.querySelector(".dueDate").value = "";
        })
    // })

}

export default createTasks;
