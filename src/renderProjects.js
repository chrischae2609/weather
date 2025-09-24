
import displayTasks from "./displayTasks.js";
import { currProjects } from "./index.js";

window.addEventListener("DOMContentLoaded", () => {
    currProjects.forEach(project => renderProject(project));
});

function renderProject(project) {
    const projects = document.getElementById("projects");

    const addedProject = document.createElement("div");
    addedProject.className = "addedProject";

    const projectBtn = document.createElement("div");
    projectBtn.className = "projectBtn";
    projectBtn.textContent = project.title;
    addedProject.appendChild(projectBtn);

    const extrasBtn = document.createElement("button");
    extrasBtn.className = "extrasBtn";
    extrasBtn.textContent = "⋯";

    const extras = document.createElement("div");
    extras.className = "extras";

    projectBtn.appendChild(extrasBtn);
    addedProject.appendChild(extras);

    extrasBtn.addEventListener("click", () => {
        extras.style.display = extras.style.display === "block" ? "none" : "block";
        extras.innerHTML = `
            <input type="text" class="rename" placeholder = "Rename">
            <div class="extraBtns">
            <button class="renameBtn">Rename</button>
            <button class="deleteProj">Delete</button>
            <button class="exitBtn">Exit</button>
            </div>
        `;
        const rename = extras.querySelector(".rename");
        const renameBtn = extras.querySelector(".renameBtn");
        const exitBtn = extras.querySelector(".exitBtn");

        renameBtn.addEventListener("click", () => {
            if (rename.value) {
                projectBtn.firstChild.textContent = rename.value;
                rename.value = '';
            } else {
                return
            }
        });

        const deleteProjBtn = extras.querySelector(".deleteProj");

        deleteProjBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            addedProject.remove();
            projectBtn.remove();
            extras.remove();
            const tasksContainer = document.getElementById("tasks");
            tasksContainer.innerHTML = "";

            const index = currProjects.indexOf(project);
            if (index > -1) currProjects.splice(index, 1);
        });

        exitBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            extras.style.display = "none";
        });
    })

    document.querySelectorAll(".projectBtn").forEach(btn => btn.classList.remove("active"));

    projectBtn.classList.add("active");

    

    
    projectBtn.addEventListener("click", () => {
        document.querySelectorAll(".projectBtn").forEach(btn => btn.classList.remove("active"));
        projectBtn.classList.add("active");
        displayTasks(project);
    });

    projects.appendChild(addedProject);
}


export default renderProject;