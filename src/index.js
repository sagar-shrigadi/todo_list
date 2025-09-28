import './reset.css';
import './styles.css';
import deleteImageSvg from "./assets/icons/close_black.svg";

const addTaskButton = document.querySelector(".addTasksContainer");
const addTaskModal = document.querySelector("#addTasksDialog");
const addTaskForm = document.querySelector(".addTasksForm");
const cancelModalButton = document.querySelector(".cancelModal");
const toDoLists = document.querySelector(".toDoLists");

const tasksArray = [];

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
    
    tasksArray.push(newTask);
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

        const taskIndex = tasksArray.findIndex(task => task.id === taskId);
        if(taskIndex !== -1){
            tasksArray.splice(taskIndex, 1);
        }

        toDoLists.removeChild(toDoContainer);
    });

    toDoContainer.append(toDoCheckbox, toDoTitle, toDoDueDate, toDoDeleteButton);
    toDoLists.appendChild(toDoContainer);
}