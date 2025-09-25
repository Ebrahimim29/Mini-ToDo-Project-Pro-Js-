const modal = document.getElementById("taskModal");
const taskList = document.getElementById("taskList");
const titleInput = document.getElementById("taskTitle");
const textInput = document.getElementById("taskText");
const modalTitle = document.getElementById("modalTitle");
const addBtn = document.getElementById("addTaskBtn");
const saveBtn = document.getElementById("saveBtn");

// تابع خود اجرا ، چون قراره توسط این تابع کلوژر رو پیاده سازی کنیم و بعدا توسط توابع داخلی این فانکشن بتوانیم متغییر رو مدیریت کنیم.

const TaskManager = (function() {

    // دریافت مقادیر نام در فضای ذخیره سازی مرورگر
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function save() { localStorage.setItem("tasks" , JSON.stringify(tasks));}

    //  تعریف توابع موردنیاز برای کار با آرایه (میخواهیم یک آبجکت داشته باشیم از چند تابع)
    // Singleton Object: آبجکتی که فقط یک بار ساخته میشه و همه جا همون یک نمونه استفاده میشه
    return{
        get: () =>tasks , //خروجی همان آرایه تسک هست
        add: (task) =>{tasks.push(task); save();},
    };



    // نوشتن یک تابع برای دسترسی به متغییر بالا و  در پایین اجرا بشود
    // return {
    //     addTask: (task) => {
    //         tasks.push(task);
    //         console.log("Current tasks array:" , tasks);
    //         localStorage.setItem("tasks" , JSON.stringify(tasks));
    //     },
    //     getTasks: () => tasks
    // }

})();


// --------روش 2:--------
// const TaskManger = function() {
    
// };

// const Ts = TaskManager();
// const Ts1 = TaskManager();
// const Ts2 = TaskManager();

//-----------------------

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

render();

// تابع رندر برای بارگذاری مجدد اطلاعات (اضافه کردن li به ul)
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