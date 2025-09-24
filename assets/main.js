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

    // نوشتن یک تابع برای دسترسی به متغییر بالا و  در پایین اجرا بشود
    return (task) => {
        tasks.push(task);
        console.log("Current tasks array:" , tasks);
        localStorage.setItem("tasks" , JSON.stringify(tasks));
        
    }

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

    TaskManager(task);
    modal.close();
}