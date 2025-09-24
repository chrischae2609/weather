
const STORAGE_KEY = "projects";

export function saveProjects(projects) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));

}

export function loadProjects() {
    const projects = localStorage.getItem(STORAGE_KEY);
    return projects ? JSON.parse(projects) : [];
}
