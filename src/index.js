

// current projects

import "./styles.css";
import createProject from "./createProject.js";
import { loadProjects } from "./localStorage.js";

export let currProjects = loadProjects();

const newProjectBtn = document.getElementById("newProject");

const tasks = document.getElementById("tasks");

newProjectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createProject();
    tasks.style.display = "block";
});

