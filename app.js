// Store selected elements as variables
const name = document.getElementById("name");
const task = document.getElementById("task");
const nameAssigner = document.getElementById("name-assigner");
const taskAssigner = document.getElementById("task-assigner");
const nameUl = document.getElementById("name-ul");
const taskUl = document.getElementById("task-ul");
const taskAssignerUl = document.getElementById("task-assigner-ul");
const addNameBtn = document.getElementById("add-name-btn");
const addTaskBtn = document.getElementById("add-task-btn");
const assignTaskBtn = document.getElementById("assign-task-btn");
const selectName = document.getElementById("name-assigner");
const selectTask = document.getElementById("task-assigner");

// Declare variables
let storedNameArray = [];
let storedTaskArray = [];
let storedAssignedNameArray = [];
let storedAssignedTaskArray = [];


/* NAME LIST */

// On click, run the function to add name to array in localStorage
addNameBtn.addEventListener("click", () => {
    if (localStorage.storedNameArray != undefined) {
        storedNameArray = JSON.parse(localStorage.getItem("storedNameArray"));
    }
    alertUserName();
    const nameInput = name.value;
    storedNameArray.push(nameInput);
    localStorage.setItem("storedNameArray", JSON.stringify(storedNameArray));
    name.value = "";
    createNameListElement();
});

// Append the checkbox to the name-ul element
// Retrieve values from localStorage, and add it to nameUl
createNameListElement = () => {
    const retrievedNameArray = JSON.parse(localStorage.getItem("storedNameArray"));
    const li = document.createElement("li");
    const cb = createCheckBox();
    li.appendChild(cb);
    li.appendChild(document.createTextNode(retrievedNameArray.slice(-1)[0]));
    nameUl.appendChild(li);
    selectName[selectName.length] = new Option((retrievedNameArray.slice(-1)[0]), (retrievedNameArray.slice(-1)[0]));
    //Add event listener on click to toggle css strike through class
    cb.addEventListener("click", () => {
        li.classList.toggle("strikethrough");
    });
}
/* NAME LIST - END*/


/* TASK LIST */

// On click, run the function to add task to array in localStorage
addTaskBtn.addEventListener("click", () => {
    if (localStorage.storedTaskArray != undefined) {
        storedTaskArray = JSON.parse(localStorage.getItem("storedTaskArray"));
    }
    alertUserTask();
    const taskInput = task.value;
    storedTaskArray.push(taskInput);
    localStorage.setItem("storedTaskArray", JSON.stringify(storedTaskArray));
    task.value = "";
    createTaskListElement();
});

// Append the checkbox to the task-ul element
// Retrieve values from localStorage, and add it to taskUl
createTaskListElement = () => {
    const retrievedTaskArray = JSON.parse(localStorage.getItem("storedTaskArray"));
    const li = document.createElement("li");
    const cb = createCheckBox();
    li.appendChild(cb);
    li.appendChild(document.createTextNode(retrievedTaskArray.slice(-1)[0]));
    taskUl.appendChild(li);
    selectTask[selectTask.length] = new Option((retrievedTaskArray.slice(-1)[0]), (retrievedTaskArray.slice(-1)[0]));
    cb.addEventListener("click", () => {
        li.classList.toggle("strikethrough");
    });
}
/* TASK LIST - END*/


/* ASSIGN TASK FUNCTIONS */

// On click, run the function to add assigned name to array in localStorage
assignName = () => {
    if (localStorage.storedAssignedNameArray != undefined) {
        storedAssignedNameArray = JSON.parse(localStorage.getItem("storedAssignedNameArray"));
    }
    const nameAssignerInput = nameAssigner.value;
    storedAssignedNameArray.push(nameAssignerInput);
    localStorage.setItem("storedAssignedNameArray", JSON.stringify(storedAssignedNameArray));
};

// On click, run the function to add assigned task to array in localStorage
assignTask = () => {
    if (localStorage.storedAssignedTaskArray != undefined) {
        storedAssignedTaskArray = JSON.parse(localStorage.getItem("storedAssignedTaskArray"));
    }
    const taskAssignerInput = taskAssigner.value;
    storedAssignedTaskArray.push(taskAssignerInput);
    localStorage.setItem("storedAssignedTaskArray", JSON.stringify(storedAssignedTaskArray));
};

// append the checkbox to the taskAssignerUl element
// retrieve elements from localStorage, and add it to taskAssignerUl
assignTaskListElement = () => {
    const retrievedAssignedNameArray = JSON.parse(localStorage.getItem("storedAssignedNameArray"));
    const retrievedAssignedTaskArray = JSON.parse(localStorage.getItem("storedAssignedTaskArray"));
    const li = document.createElement("li");
    const cb = createCheckBox();
    li.appendChild(cb);
    li.appendChild(document.createTextNode(`Name: ${retrievedAssignedNameArray.slice(-1)[0]}   -   Task: `));
    li.appendChild(document.createTextNode(retrievedAssignedTaskArray.slice(-1)[0]));
    taskAssignerUl.appendChild(li);
    cb.addEventListener("click", () => {
        li.classList.toggle("strikethrough");
    });
}

assignTaskBtn.addEventListener("click", () => {
    assignName();
    assignTask();

    assignTaskListElement();
});
/* ASSIGN TASK FUNCTIONS - END*/


/* COLLECTIVE FUNCTIONS */

// Create checkboxes for li-elements
createCheckBox = () => {
    var cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = false;
    return cb;
}
/* COLLECTIVE FUNCTIONS - END*/


//Pull values from local storage and run it on page-load
loadFromLocaleStorage = () => {
    if (localStorage.storedNameArray != undefined) {
        const retrievedNameArray = JSON.parse(localStorage.getItem("storedNameArray"));
        for (let x of retrievedNameArray) {
            const li = document.createElement("li");
            const cb = createCheckBox();
            li.appendChild(cb);
            li.appendChild(document.createTextNode(x));
            nameUl.appendChild(li);
            selectName[selectName.length] = new Option(x, retrievedNameArray[x]);
            cb.addEventListener("click", () => {
                li.classList.toggle("strikethrough");
            });
        }
    }
    if (localStorage.storedTaskArray != undefined) {
        const retrievedTaskArray = JSON.parse(localStorage.getItem("storedTaskArray"));
        for (let x of retrievedTaskArray) {
            const li = document.createElement("li");
            const cb = createCheckBox();
            li.appendChild(cb);
            li.appendChild(document.createTextNode(x));
            taskUl.appendChild(li);
            selectTask[selectTask.length] = new Option(x, retrievedTaskArray[x]);
            cb.addEventListener("click", () => {
                li.classList.toggle("strikethrough");
            });
        }
    }

    if (localStorage.storedAssignedNameArray && localStorage.storedAssignedTaskArray != undefined) {
        var retrievedAssignedNameArray = JSON.parse(localStorage.getItem("storedAssignedNameArray"));
        var retrievedAssignedTaskArray = JSON.parse(localStorage.getItem("storedAssignedTaskArray"));
        for (let x of retrievedAssignedNameArray) {
            const li = document.createElement("li");
            const cb = createCheckBox();
            li.appendChild(cb);
            li.appendChild(document.createTextNode(`Name: ${x}   -   Task: ${retrievedAssignedTaskArray}`));
            taskAssignerUl.appendChild(li);
            cb.addEventListener("click", () => {
                li.classList.toggle("strikethrough");
            });
        }
    }
}

// Function which alerts user if not filled textbox
function alertUserName() {
    if (document.getElementById("name").value.length == 0) {
        alert("ERROR! Input name.");
        return false;
    }
}

function alertUserTask() {
    if (document.getElementById("task").value.length == 0) {
        alert("ERROR! Input task.");
        return false;
    }
}


// On click, which calls three different functions 

document.getElementById("remove-name-button").onclick = function () {
    removeLocalName();
    location.reload();

}

document.getElementById("remove-task-button").onclick = function () {
    removeLocalTask();
    location.reload();
}

document.getElementById("remove-assigned-button").onclick = function () {
    removeLocalAssigned();
    location.reload();
}

// Functions witch clears the localStorage of Names, Tasks and Assigned names and tasks.


function removeLocalName() {
    localStorage.removeItem("storedNameArray");

}

function removeLocalTask() {
    localStorage.removeItem("storedTaskArray");

}

function removeLocalAssigned() {
    localStorage.removeItem("storedAssignedNameArray");
    localStorage.removeItem("storedAssignedTaskArray");

}