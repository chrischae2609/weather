// module to create projects


// import todo/tasks function from createTasks file

import displayTasks from "./displayTasks.js";
import renderProject from "./renderProjects.js";
import { saveProjects, loadProjects } from "./localStorage.js";
import { currProjects } from "./index.js";



function createProject() {
    const projects = document.getElementById("projects");

    if (projects.querySelector(".newProjectForm")) {
        return;
    }

    const newProjForm = document.createElement("div");
    newProjForm.className = "newProjectForm";
    newProjForm.innerHTML = `
        <input class="projectInput" type="text" placeholder="Project Name: " required>

            <button class="cancelBtn">Cancel</button>
            <button class="saveProjBtn">Save</button>

    `;
    projects.appendChild(newProjForm);


    const input = projects.querySelector(".projectInput");
    const cancelBtn = projects.querySelector(".cancelBtn");
    const saveBtn = projects.querySelector(".saveProjBtn");
    
    let project = null;
    
    saveBtn.addEventListener("click", () => {
        const title = input.value;
    
        if (title) {
            const project = { title, tasks: [] };
            currProjects.push(project);

            saveProjects(currProjects);
            renderProject(project);
            displayTasks(project);

            newProjForm.remove();
        }
    })
    cancelBtn.addEventListener("click", () => {
        newProjForm.remove();
    })



    

}

export default createProject;