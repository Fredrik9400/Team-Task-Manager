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
const removeNameBtn = document.getElementById("remove-name-button");
const removeTaskBtn = document.getElementById("remove-task-button");
const removeAssignedBtn = document.getElementById("remove-assigned-button");

// Declare variables
let NameArray = [];
let TaskArray = [];
let AssignedNameArray = [];
let AssignedTaskArray = [];


/* NAME LIST */
// On click, run the function to add name to array in localStorage
addNameBtn.addEventListener("click", () => {
    if (name.value.length == 0) {
        alert("ERROR! Input name.");
        return false;
    } else {
        const nameInput = name.value;
        NameArray.push(nameInput);
        localStorage.setItem("NameArray", JSON.stringify(NameArray));
        name.value = "";
        createNameListElement();
    }
});

// Append the checkbox to the name-ul element
// Retrieve values from localStorage, and add it to nameUl
createNameListElement = () => {
    if (localStorage.NameArray) {
        NameArray = JSON.parse(localStorage.getItem("NameArray"));
    }
    const li = document.createElement("li");
    const cb = createCheckBox();
    li.appendChild(cb);
    li.appendChild(document.createTextNode(NameArray.slice(-1)[0]));
    nameUl.appendChild(li);
    selectName[selectName.length] = new Option((NameArray.slice(-1)[0]), (NameArray.slice(-1)[0]));
    //Add event listener on click to toggle css strike through class
    cb.addEventListener("click", () => {
        li.classList.toggle("strikethrough");
    });
}
/* NAME LIST - END*/


/* TASK LIST */
// On click, run the function to add task to array in localStorage
addTaskBtn.addEventListener("click", () => {
    if (task.value.length == 0) {
        alert("ERROR! Input task.");
        return false;
    } else {
        const taskInput = task.value;
        TaskArray.push(taskInput);
        localStorage.setItem("TaskArray", JSON.stringify(TaskArray));
        task.value = "";
        createTaskListElement();
    }
});

// Append the checkbox to the task-ul element
// Retrieve values from localStorage, and add it to taskUl
createTaskListElement = () => {
    if (localStorage.TaskArray) {
        TaskArray = JSON.parse(localStorage.getItem("TaskArray"));
    }
    const li = document.createElement("li");
    const cb = createCheckBox();
    li.appendChild(cb);
    li.appendChild(document.createTextNode(TaskArray.slice(-1)[0]));
    taskUl.appendChild(li);
    selectTask[selectTask.length] = new Option((TaskArray.slice(-1)[0]), (TaskArray.slice(-1)[0]));
    cb.addEventListener("click", () => {
        li.classList.toggle("strikethrough");
    });
}
/* TASK LIST - END*/


/* ASSIGN TASK FUNCTIONS */
// Add assigned name to array in localStorage
assignName = () => {
    if (localStorage.AssignedNameArray) {
        AssignedNameArray = JSON.parse(localStorage.getItem("AssignedNameArray"));
    }
    const nameAssignerInput = nameAssigner.value;
    AssignedNameArray.push(nameAssignerInput);
    localStorage.setItem("AssignedNameArray", JSON.stringify(AssignedNameArray));
};

// Add assigned task to array in localStorage
assignTask = () => {
    if (localStorage.AssignedTaskArray) {
        AssignedTaskArray = JSON.parse(localStorage.getItem("AssignedTaskArray"));
    }
    const taskAssignerInput = taskAssigner.value;
    AssignedTaskArray.push(taskAssignerInput);
    localStorage.setItem("AssignedTaskArray", JSON.stringify(AssignedTaskArray));
};

// append the checkbox to the taskAssignerUl element
// retrieve elements from localStorage, and add it to taskAssignerUl
assignTaskListElement = () => {
    AssignedNameArray = JSON.parse(localStorage.getItem("AssignedNameArray"));
    AssignedTaskArray = JSON.parse(localStorage.getItem("AssignedTaskArray"));
    const li = document.createElement("li");
    const cb = createCheckBox();
    li.appendChild(cb);
    li.appendChild(document.createTextNode(`Name: ${AssignedNameArray.slice(-1)[0]} - Task: `));
    li.appendChild(document.createTextNode(AssignedTaskArray.slice(-1)[0]));
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


//Pull values from local storage and run it on page-load
loadFromLocaleStorage = () => {
    if (localStorage.NameArray) {
        NameArray = JSON.parse(localStorage.getItem("NameArray"));
        for (let x of NameArray) {
            const li = document.createElement("li");
            const cb = createCheckBox();
            li.appendChild(cb);
            li.appendChild(document.createTextNode(x));
            nameUl.appendChild(li);
            selectName[selectName.length] = new Option(x, NameArray[x]);
            cb.addEventListener("click", () => {
                li.classList.toggle("strikethrough");
            });
        }
    }

    if (localStorage.TaskArray) {
        TaskArray = JSON.parse(localStorage.getItem("TaskArray"));
        for (let x of TaskArray) {
            const li = document.createElement("li");
            const cb = createCheckBox();
            li.appendChild(cb);
            li.appendChild(document.createTextNode(x));
            taskUl.appendChild(li);
            selectTask[selectTask.length] = new Option(x, TaskArray[x]);
            cb.addEventListener("click", () => {
                li.classList.toggle("strikethrough");
            });
        }
    }

    if (localStorage.AssignedNameArray && localStorage.AssignedTaskArray) {
        AssignedNameArray = JSON.parse(localStorage.getItem("AssignedNameArray"));
        AssignedTaskArray = JSON.parse(localStorage.getItem("AssignedTaskArray"));
        var zip = (a,b) => a.map((x,i) => [x,b[i]]);
        for (let [a, b] of zip(AssignedNameArray, AssignedTaskArray)) {
            const li = document.createElement("li");
            const cb = createCheckBox();
            li.appendChild(cb);
            li.appendChild(document.createTextNode(`Name: ${a} - Task: ${b}`));
            taskAssignerUl.appendChild(li);
            cb.addEventListener("click", () => {
                li.classList.toggle("strikethrough");
            });
        }
    }
}


/* OTHER FUNCTIONS */
// Create checkboxes for li-elements
createCheckBox = () => {
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = false;
    return cb;
}

// On click, which calls three different functions 
removeNameBtn.onclick = () => {
    removeLocalName();
    location.reload();
}

removeTaskBtn.onclick = () => {
    removeLocalTask();
    location.reload();
}

removeAssignedBtn.onclick = () => {
    removeLocalAssigned();
    location.reload();
}

// Functions witch clears the localStorage of Names, Tasks and Assigned names and tasks.
removeLocalName = () => {
    localStorage.removeItem("NameArray");
}

removeLocalTask = () => {
    localStorage.removeItem("TaskArray");
}

removeLocalAssigned = () => {
    localStorage.removeItem("AssignedNameArray");
    localStorage.removeItem("AssignedTaskArray");
}
/* OTHER FUNCTIONS - END*/