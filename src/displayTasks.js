// module to display the tasks

import createTasks from "./createTasks.js";
import { saveProjects } from "./localStorage.js";
import { currProjects } from "./index.js";

function displayTasks(project) {
    const tasksSection = document.getElementById("tasks");
    tasksSection.innerHTML = "";

    const tasksContainer = document.createElement("div");
    tasksContainer.className = "tasksContainer";

    createTasks(project);

    tasksSection.appendChild(tasksContainer);
    project.tasks.forEach(task => {
        const taskDisplay = document.createElement("div");
        taskDisplay.className = "taskDisplay";
        taskDisplay.innerHTML = `
        <h3 class="title">${task.taskTitle}</h3>
        <div class="desc">${task.desc}</div>
        <div class="taskPriority">Priority: ${task.priority}</div>
        <div class="date">Due: ${task.dueDate}</div>
        <div class="done">
            <input type="checkbox" class="finished">
            <label for="finished">Done</label>
        </div>
        <button class="removeTaskBtn">Remove Task</button>
        `;
        tasksContainer.append(taskDisplay);

        const taskTitle = taskDisplay.querySelector(".title");
        const description = taskDisplay.querySelector(".desc");
        const priority = taskDisplay.querySelector(".taskPriority");
        const checkbox = taskDisplay.querySelector(".finished");
        const removeTaskBtn = taskDisplay.querySelector(".removeTaskBtn");

        if (description.innerHTML === "") {
            description.style.backgroundColor = "inherit";
        }

        checkbox.checked = task.done || false;
        taskTitle.style.backgroundColor = task.done ? "rgb(113, 247, 113)" : "rgb(255, 255, 151)";



        checkbox.addEventListener("change", () => {
            task.done = checkbox.checked;
            taskTitle.style.backgroundColor = task.done ? "rgb(113, 247, 113)" : "rgb(255, 255, 151)";
            saveProjects(currProjects);
        })

        if (task.priority === "Low") {
            priority.style.backgroundColor = "lightgreen";
         } else if (task.priority === "Medium") {
            priority.style.backgroundColor = "orange";
         } else {
             priority.style.backgroundColor = "red";
         };

         removeTaskBtn.addEventListener("click", () => {
            const index = project.tasks.indexOf(task);
            if (index > -1) project.tasks.splice(index, 1);
        
            // taskDisplay.remove();
            saveProjects(currProjects);
            displayTasks(project);
         })

    });


};

export default displayTasks;