const modal = document.getElementById("taskModal");
const taskList = document.getElementById("taskList");
const titleInput = document.getElementById("taskTitle");
const textInput = document.getElementById("taskText");
const modalTitle = document.getElementById("modalTitle");
const addBtn = document.getElementById("addTaskBtn");
const saveBtn = document.getElementById("saveBtn");


const TaskManager = (function() {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function save() { localStorage.setItem("tasks" , JSON.stringify(tasks));}

   
    return{
        get: () =>tasks , //خروجی همان آرایه تسک هست
        add: (task) =>{tasks.push(task); save();},
        remove: (index) => {tasks.splice(index , 1); save();},
    };



    

})();




// تابع باز کردن پاپ آپ
addBtn.onclick = () => {
    modalTitle.textContent = "New Task";
    titleInput.value = "";
    textInput.value = "";
    modal.showModal();
}

// تابع ذخیره تسک
saveBtn.onclick = (e) =>{
    e.preventDefault();
    if(!titleInput.value || !textInput.value){
        alert("Please fill Task and Description!❌");
        return
    }

    const task = {
        title: titleInput.value,
        text: textInput.value,
        date: new Date().toLocaleString("fa-IR")
    };

    TaskManager.add(task);
    modal.close();
    render();
};

// تابع ویرایش تسک
window.editTask = (i) =>{
    const t = TaskManager.get()[i];
    modalTitle.textContent = "Edit Task";
    titleInput.value = t.title;
    textInput.value = t.text;
    modal.showModal();
}


// تابع حذف تسک
const deleteTask = (i) => {
    TaskManager.remove(i);
    render();
};

render();

function render() {
    taskList.innerHTML = "";
    // console.log(TaskManager());
    TaskManager.get().forEach((task, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class = "task-header">
                <span class = "task-title">${task.title}</span>
                <div class = "task-action">
                    <button class = "yellow fs_2x shadow"
                    title = "Edit"
                    onclick = "editTask(${i})">&#9998;</button>

                    <button class = "red fs_2x "
                    title = "Delete"
                    onclick = "deleteTask(${i})">&#x1f5D1;</button>

                    <button class = "green fs_2x "
                    title = "Complete"
                    onclick = "completeTask(${i} , 1)">&#x2611;</button>

                    <button class = "orange fs_2x "
                    title = "Un Complete"
                    onclick = "completeTask(${i} , 2)">&#10006;</button>
                </div>
            </div>
            <div>${task.text}</div>
            <div class = "task-date">${task.date}</div>
            `;
        taskList.appendChild(li);
    });
    
}