const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

const taskData = [];
let currentTask = {};

const addOrUpdateTask = () => {
    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

    // To make the id more unique, add another hyphen and use Date.now().
    // Date.now() returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.
    const taskObj = {
      id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
      title: titleInput.value,
      date: dateInput.value,
      description: descriptionInput.value,
    };
  
    // Create an if statement with the condition dataArrIndex === -1. 
    // Within the if statement, use the unshift() method to add the 
    // taskObj object to the beginning of the taskData array.
    if (dataArrIndex === -1) {
      taskData.unshift(taskObj);
    }
    updateTaskContainer()
    reset()
  };

const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";

  taskData.forEach(
    ({ id, title, date, description }) => {
        (tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button type="button" class="btn">Edit</button>
          <button type="button" class="btn">Delete</button> 
        </div>
      `)
    }
  );
};




const reset = () => {
    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";
    taskForm.classList.toggle("hidden");
    currentTask = {};
  }
  

// toggle add the class attribute if not present,
// remove the class attribute if present
openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

closeTaskFormBtn.addEventListener("click", () => {
    // You should display the Cancel and Discard buttons to the 
    // user only if there is some text present in the input fields.
    const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
    if(formInputsContainValues){
        confirmCloseDialog.showModal();
        }
      else {
        reset()
      }
  });


//  If the user clicks the Cancel button, you want to cancel the process and 
//  close the modal so the user can continue editing. The HTML dialog element 
//  has a close() method that can be used to close a modal dialog box on a web page.
cancelBtn.addEventListener('click', ()=>confirmCloseDialog.close())

discardBtn.addEventListener('click',()=>{
    confirmCloseDialog.close();
    reset();
  })


// add a submit event listener to your taskForm element and pass in e as the parameter 
// of your arrow function. Inside the curly braces, use the preventDefault() method to 
// stop the browser from refreshing the page after submitting the form.
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    addOrUpdateTask();
  });