// تابع خود اجرا ، چون قراره توسط این تابع کلوژر رو پیاده سازی کنیم و بعدا توسط توابع داخلی این فانکشن بتوانیم متغییر رو مدیریت کنیم.
const TaskManager = (function () {
    // دریافت مقادیر نام در فضای ذخیره سازی مرورگر
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function save() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    //  تعریف توابع موردنیاز برای کار با آرایه (میخواهیم یک آبجکت داشته باشیم از چند تابع)
    // Singleton Object: آبجکتی که فقط یک بار ساخته میشه و همه جا همون یک نمونه استفاده میشه

    return {
        get: () => tasks,
        add: (task) => {tasks.push(task);save();},
        update: (index, task) => {tasks[index] = task;save();},
        remove: (index) => {tasks.splice(index, 1);save();},
        //array.splice(start, deleteCount, item1, item2, ....)
        complete: (index, bool) => {tasks[index].completed = bool ? bool : 0;save();} // اضافه شد
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

// ابجاد متعیر ها با استفاده فراخوانی المان های صفحه
const taskList = document.getElementById("taskList");
const modal = document.getElementById("taskModal");
const addBtn = document.getElementById("addTaskBtn");
const saveBtn = document.getElementById("saveBtn");
const titleInput = document.getElementById("taskTitle");
const textInput = document.getElementById("taskText");
const modalTitle = document.getElementById("modalTitle");

let editIndex = null;

// تابع باز کردن پاپ آپ
addBtn.onclick = () => {
    editIndex = null;
    modalTitle.textContent = "تسک جدید";
    titleInput.value = "";
    textInput.value = "";
    modal.showModal();
};

// تابع ذخیره تسک 
saveBtn.onclick = (e) => {
    e.preventDefault();
    if (!titleInput.value || !textInput.value) {
        alert("لطفا عنوان و توضیحات تسک را وارد کنید.");
        return
    }
    const task = {
        title: titleInput.value,
        text: textInput.value,
        date: new Date().toLocaleString("fa-IR")
    };
    if (editIndex !== null) TaskManager.update(editIndex, task);
    else TaskManager.add(task);
    render();
    modal.close();
};

// تابع ویرایش تسک
window.editTask = (i) => {
    const t = TaskManager.get()[i];
    editIndex = i;
    modalTitle.textContent = "ویرایش تسک";
    titleInput.value = t.title;
    textInput.value = t.text;
    modal.showModal();
};

// تابع حذف تسک
const deleteTask = (i) => {
    TaskManager.remove(i);
    render();
};

// تابع وضعیت کامل بودن تسک
const completeTask = (i, bool) => {
    console.log(i);

    TaskManager.complete(i, bool);
    render();
};

render();

// تابع رندر برای بارگذاری مجدد اطلاعات (اضافه کردن li به ul)

function render() {
    taskList.innerHTML = "";
    TaskManager.get().forEach((task, i) => {
        const li = document.createElement("li");
        // اگر تسک کامل شده بود کلاس اضافه شود
        li.className = task.completed === 1 ? "completed" : task.completed === 2 ? "not-completed" : "";
        li.innerHTML = `
          <div class="task-header">
            <span class="task-title">${task.title}</span>
            <div class="task-actions">
              <button class="yellow fs_2x shadow" 
              title="ویرایش" 
              onclick="editTask(${i})">&#9998;</button>
              
              <button class="red fs_2x " 
              title="حذف" 
              onclick="deleteTask(${i})">&#x1F5D1; </button>

              <button class="green fs_2x " 
              title="تکمیل" 
              onclick="completeTask(${i}, 1)" >&#x2611;</button>

              <button class="orange fs_2x " 
              title="عدم تکمیل" 
              onclick="completeTask(${i}, 2)" >&#10006;</button>
            </div>
          </div>
          <div>${task.text}</div>
          <div class="task-date">${task.date}</div>
        `;
        taskList.appendChild(li);
    });
}