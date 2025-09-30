import './reset.css';
import './styles.css';
import deleteImageSvg from "./assets/icons/close_black.svg";
import projectNewIconSvg from "./assets/icons/list_black.svg";

const addTaskButton = document.querySelector(".addTasksContainer");
const addTaskModal = document.querySelector("#addTasksDialog");
const addTaskForm = document.querySelector(".addTasksForm");
const cancelModalButton = document.querySelector(".cancelModal");
const toDoLists = document.querySelector(".toDoLists");

const addProjectsButton = document.querySelector(".addProjectsContainer");
const addProjectsModal = document.querySelector(".addProjectsDialog");
const addProjectsForm = document.querySelector(".addProjectsForm");
const cancelProjectsModalButton = document.querySelector(".cancelProjectsModalButton");
const projectLists = document.querySelector(".projectListsUL");

const projects = [
    {
        id: Date.now(), name:"Inbox", tasks:[],
    },
];
let activeProject = projects[0];
// const tasksArray = [];

addProjectsButton.addEventListener("click", ()=>{
    addProjectsModal.showModal();
});

cancelProjectsModalButton.addEventListener("click", ()=>{
    addProjectsModal.close();
});

addProjectsForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const projectTitle = document.querySelector(".addProjectsInput").value;

    const newProjects = createProjects(projectTitle);

    projects.push(newProjects);
    projectAdditionDom(newProjects);

    addProjectsForm.reset();
    addProjectsModal.close();
});


addTaskButton.addEventListener("click", ()=>{
    addTaskModal.showModal();
});

cancelModalButton.addEventListener("click", ()=>{
    addTaskModal.close();
});

addTaskForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const taskTitle = document.querySelector("#taskTitle").value;
    const taskDueDate = document.querySelector("#taskDueDate").value;

    const newTask = CreateTasks(taskTitle, taskDueDate);
    
    // tasksArray.push(newTask);
    activeProject.tasks.push(newTask);
    taskAdditionDOM(newTask);

    addTaskForm.reset();
    addTaskModal.close();
});

function CreateTasks(title, dueDate, isCompleted = false){

    const finalDueDate = dueDate || "No due date";

    return {
        title,
        finalDueDate,
        isCompleted,
        id: Date.now(),
    };
}

function taskAdditionDOM(taskToAdd){
    const toDoContainer = document.createElement("li");
    toDoContainer.classList.add("taskContainer");
    toDoContainer.dataset.taskId = taskToAdd.id;

    const toDoCheckbox = document.createElement("input");
    toDoCheckbox.type = "checkbox"

    const toDoTitle = document.createElement("p");
    toDoTitle.textContent = taskToAdd.title;

    const toDoDueDate = document.createElement("p");
    toDoDueDate.textContent = taskToAdd.finalDueDate;

    const toDoDeleteButton = document.createElement("button");
    const deleteImage = document.createElement("img");
    deleteImage.src = deleteImageSvg;
    toDoDeleteButton.appendChild(deleteImage);

    toDoDeleteButton.addEventListener("click", ()=>{
        const taskId = parseInt(toDoContainer.dataset.taskId);

        const taskIndex = activeProject.tasks.findIndex(task => task.id === taskId);
        if(taskIndex !== -1){
            activeProject.tasks.splice(taskIndex, 1);
        }

        toDoLists.removeChild(toDoContainer);
    });

    toDoContainer.append(toDoCheckbox, toDoTitle, toDoDueDate, toDoDeleteButton);
    toDoLists.appendChild(toDoContainer);
}

function createProjects(title){
    const tasks = [];

    return{
        id: Date.now(),
        name: title,
        tasks,
    };
}

function projectAdditionDom(projectToAdd){
    const newProjectsContainer = document.createElement("li");
    newProjectsContainer.classList.add("projectContainer");
    newProjectsContainer.dataset.projectId = projectToAdd.id;

    const projectNewImage = document.createElement("img");
    projectNewImage.src = projectNewIconSvg;
    
    const projectTitle = document.createElement("p");
    projectTitle.textContent = projectToAdd.name;

    const projectDeleteButton = document.createElement("button");
    const deleteImage = document.createElement("img");
    deleteImage.src = deleteImageSvg;
    projectDeleteButton.appendChild(deleteImage);

    projectDeleteButton.addEventListener("click", ()=>{
        const projectId = parseInt(newProjectsContainer.dataset.projectId);

        const projectIndex = projects.findIndex(project => project.id === projectId);
        if(projectIndex !== -1){
            projects.splice(projectIndex, 1);
        }

        projectLists.removeChild(newProjectsContainer);
        activeProject = projects[0];
    });

    newProjectsContainer.append(projectNewImage, projectTitle, projectDeleteButton);
    projectLists.appendChild(newProjectsContainer);
}