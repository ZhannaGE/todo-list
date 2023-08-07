function initTODOList(rootSelector) {
    const rootElement = document.querySelector(rootSelector);
    const input = rootElement.querySelector('.new');
    const buttonAdd = rootElement.querySelector('.todo_add');
    const list = rootElement.querySelector('.todo_list');

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function updateLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            buttonAdd.click();
        }
    });

// Функция для отображения задач на странице
    function renderTasks() {
        list.innerHTML = "";

        tasks.forEach(function (taskObj, index) {
            const li = document.createElement("li");
            li.classList.add("todo_task");

            const label = document.createElement("label");
            label.classList.add("todo_checkbox");
            li.appendChild(label);

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = taskObj.checked;
            label.appendChild(checkbox);

            const divElement = document.createElement("div");
            label.appendChild(divElement);

            const text = document.createElement("div");
            text.textContent = taskObj.text;
            text.classList.add("todo_task-text");
            if (taskObj.checked) {
                text.style.textDecoration = "line-through";
            }
            li.appendChild(text);

            const deleteButton = document.createElement("div");
            deleteButton.classList.add("todo_task-del");
            li.appendChild(deleteButton);

            checkbox.addEventListener("change", function () {
                taskObj.checked = checkbox.checked; // Сохраняем состояние чекбокса в объекте задачи
                updateLocalStorage();
                renderTasks(); // Обновляем список задач на странице
            });

            deleteButton.addEventListener("click", function () {
                tasks.splice(index, 1); // Удаляем задачу из массива
                updateLocalStorage();
                renderTasks(); // Обновляем список задач на странице
            });

            list.appendChild(li);
        });
    }

    buttonAdd.addEventListener("click", function () {
        const taskText = input.value.trim();

        if (taskText !== "") {
            // Добавляем задачу в массив и обновляем локальное хранилище
            tasks.push({text: taskText, checked: false});
            updateLocalStorage();

            // Отображаем обновленный список задач на странице
            renderTasks();

            input.value = "";
        }
    });

// Отображаем список задач при загрузке страницы
    renderTasks();

}

initTODOList('.myFirstList');
// initTODOList('.mySecondList');























