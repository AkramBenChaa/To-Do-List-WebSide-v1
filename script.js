// Setting Up Variables:
let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let taskContainer = document.querySelector(".task-content");
let taskCount = document.querySelector(".task-count span");
let taskCompleted = document.querySelector(".task-completed span");
let deleteButton = document.querySelector(".delete");
let storedTasks = localStorage.getItem("tasks");

if (storedTasks) {
    taskArray = JSON.parse(storedTasks);
} else {
    taskArray = [];
}

// Task Number:
taskNumber = 0;

// Focus On Input Field:
window.onload = function () {
    theInput.focus();
    const localStorages = JSON.parse(localStorage.getItem("tasks"));
    if (localStorages.length !== 0) {
        for (let i = 0; i < localStorages.length; i++) {
            let localSotageSpan = document.createElement("span");
            let localSotageSpanTaxt = document.createTextNode(localStorages[i]);
            localSotageSpan.appendChild(localSotageSpanTaxt);
            localSotageSpan.className = "task-box";
            let localSotagedelete = document.createElement("span");
            let localSotagedeleteTaxt = document.createTextNode("Delete");
            localSotagedelete.appendChild(localSotagedeleteTaxt);
            localSotagedelete.className = "delete";
            localSotageSpan.appendChild(localSotagedelete);
            taskContainer.appendChild(localSotageSpan);
            calculateTask();
        }
    }
};

// Adding The Task:
theAddButton.onclick = function () {
    let task = theInput.value;
    // If Input Is Empty:
    if (task === "") {
        Swal.fire({
            title: "Input Is Empty",
            text: "You haven't entered any mission.",
            confirmButtonText: "Ok",
            position: "center",
            customClass: {
                confirmButton: "my-button"
            }
        });
    } else {
        // Prevent Duplicate Task Names:
        let allTask = document.querySelectorAll(".task-box");
        let taskExists = Array.from(allTask).some(function (taskElement) {
            return taskElement.firstChild.textContent.trim() === task;
        });

        // Alert Message:
        if (taskExists === true) {
            theInput.value = '';
            Swal.fire({
                title: "Task duplication error",
                text: "You have already added this task.",
                confirmButtonText: "Ok",
                position: "center",
                customClass: {
                    confirmButton: "my-button"
                }
            });
        } else {
            let noTaskToShow = document.querySelector(".no-task-massage");

            // Remove Task Message If It In Body:
            if (document.body.contains(document.querySelector(".no-task-massage"))) {
                noTaskToShow.remove();
            }

            // Create Span Element:
            let mainSpan = document.createElement("span");

            // Create Delete Button:
            let deleteSpan = document.createElement("span");

            // Create Text To MainSpan:
            let textMainSpan = document.createTextNode(theInput.value);

            // Create Text To Delete:
            let textDeleteSpan = document.createTextNode("Delete");

            // Append Text To MainSpan:
            mainSpan.appendChild(textMainSpan);

            // Append Text To DeleteSpan:
            deleteSpan.appendChild(textDeleteSpan);

            // Add Class Name:
            mainSpan.className = 'task-box';
            deleteSpan.className = 'delete';

            // Append MainSpan To DeleteSpan:
            mainSpan.appendChild(deleteSpan);

            // Add Task To The Container:
            taskContainer.appendChild(mainSpan);

            // Add Task To Local Storage:
            taskArray.push(theInput.value);
            localStorage.setItem("tasks", JSON.stringify(taskArray));

            // Empty The input:
            theInput.value = "";

            // Focus:
            theInput.focus();

            // Add Task For Task Number:
            taskNumber++;

            calculateTask();
        }
    }
};

document.addEventListener("click", function (e) {
    // Remove One Task:
    if (e.target.className == "delete") {

        // Get Task Name:
        let taskName = e.target.parentNode.firstChild.textContent.trim();

        // Remove Task From taskArray:
        taskArray = taskArray.filter(function (task) {
            return task !== taskName;
        });

        // Update Local Storage:
        localStorage.setItem("tasks", JSON.stringify(taskArray));

        // Remove Task From Page:
        e.target.parentNode.remove();
        taskNumber--;
        calculateTask();
    }

    if (taskNumber === 0) {
        document.querySelector(".finished-all").textContent = "Finished All";
    }

    // Create No Task Message If There Are No Tasks:
    if (taskContainer.childElementCount == 0) {

        if (!document.querySelector(".no-task-massage")) {
            createNoTaskMassage();
        }
    }

    // Finished One Task:
    if (e.target.classList.contains('task-box')) {
        e.target.classList.toggle("finished");
        calculateTask();
    }

    // Delete All Task:
    if (e.target.className === "delete-all") {
        document.querySelectorAll(".task-box").forEach(function (task) {
            task.remove();
        });
        document.querySelector(".finished-all").textContent = "Finished All";

        // Clear taskArray:
        taskArray = [];

        // Update Local Storage:
        localStorage.setItem("tasks", JSON.stringify(taskArray));

        // Create No Task Message Only If It Doesn't Exist:
        if (!document.querySelector(".no-task-massage")) {
            createNoTaskMassage();
        }
        calculateTask();
        taskNumber = 0;
    }

    // Finished All Task:
    if (e.target.className === "finished-all") {
        document.querySelectorAll(".task-box").forEach(function (task) {
            task.classList.toggle("finished");
        });
        calculateTask();
    }
});

// Create No Task Message:
function createNoTaskMassage() {
    // Create Span:
    let noTask = document.createElement("span");

    // Create Text:
    let noTaskText = document.createTextNode("No Task To Show");

    // Append Task To Span:
    noTask.append(noTaskText);

    // Add Class:
    noTask.className = "no-task-massage";

    // Append Span To Task-Content:
    document.querySelector(".task-content").appendChild(noTask);
}

// Calculate Task:
function calculateTask() {
    taskCount.innerHTML =
        document.querySelectorAll(".task-content .task-box").length;
    taskCompleted.innerHTML =
        document.querySelectorAll(".task-content .finished").length;
}