
export const cE = (el) => document.createElement(el);

export const qS = (el) => document.querySelector(el);

export const qSA = (els) => document.querySelectorAll(els);


export const CreateTodoUserInterface = (data, loginData, divFather) => {
    if (data.length > 0) {
        const divUserUI = cE('div');
        const usernameContainer = cE('div');
        const userTodoContainer = cE('div');
        const userP = cE('p');
        const addTodoContainer = cE('div');
        const addInputTodoText = cE('input');
        const addTodoButton = cE('button');
        let todoText = "";

        divUserUI.className = "div_user_ui";
        usernameContainer.className = "div_username";
        userTodoContainer.className = "div_todo";
        userP.className = "user_p";
        addTodoContainer.className = "div_add_todo";
        addTodoButton.className = "button_add_todo";

        userP.textContent = "Username: " + loginData.username;
        data.filter(element => element.userId == loginData.id).forEach(element => {
            const singleTodoCartContainer = cE('div');
            const deleteTodoButton = cE('button');
            const changeStatusButton = cE('button');
            const statusSpan = cE('span');
            const todoCard = cE('div');

            singleTodoCartContainer.className = "single_todo_container";
            todoCard.className = "todo_card";
            statusSpan.className = "span_status_alert"

            todoCard.setAttribute("id", element.id);
            todoCard.setAttribute("completed", element.completed);
            todoCard.textContent = element.todo;
            if (element.completed == false)
            {   
                statusSpan.textContent = "Status: Not completed"
                todoCard.className = "todo_card_notcompleted";
            }
            else{
                statusSpan.textContent = "Status: Completed"
            }
            
            deleteTodoButton.textContent = "Delete";
            changeStatusButton.textContent = "Change Status";

            singleTodoCartContainer.append(todoCard, deleteTodoButton, statusSpan,changeStatusButton);
            userTodoContainer.append(singleTodoCartContainer);

            deleteTodoButton.addEventListener('click', (e) => {
                data.splice(data.findIndex((element) => element.id == todoCard.id), 1);
                localStorage.setItem("todoList", JSON.stringify(data));
                divFather.textContent = "";
                CreateTodoUserInterface(JSON.parse(localStorage.getItem("todoList")), loginData, divFather);
            });

            changeStatusButton.addEventListener('click', (e) => {
                element.completed = !element.completed;
                
                localStorage.setItem("todoList", JSON.stringify(data));
                divFather.textContent = "";
                CreateTodoUserInterface(JSON.parse(localStorage.getItem("todoList")), loginData, divFather);
            })
        });
        
        addTodoButton.textContent = "Add new todo";
        usernameContainer.append(userP);
        addTodoContainer.append(addInputTodoText, addTodoButton);
        divUserUI.append(usernameContainer, userTodoContainer, addTodoContainer);
        divFather.append(divUserUI);

        addInputTodoText.addEventListener('input', (e) => {
            todoText = e.target.value;
        })
        addTodoButton.addEventListener('click', () => {
            data.push({
                "id": Date.now(),
                "todo": todoText,
                "completed": false,
                "userId": loginData.id,
            });
            localStorage.setItem("todoList", JSON.stringify(data));
            divFather.textContent = "";
            CreateTodoUserInterface(JSON.parse(localStorage.getItem("todoList")), loginData, divFather);
        })
    }
    else {
        const divUserUI = cE('div');
        const messageEmpyTodo = cE('p');
        messageEmpyTodo.textContent = "There are not Todo, you can add some todo using the bottom form";
        const addTodoContainer = cE('div');
        const addInputTodoText = cE('input');
        const addTodoButton = cE('button');
        let todoText = "";

        divUserUI.className = "div_user_ui";
        messageEmpyTodo.className = "alert_p"
        addTodoContainer.className = "div_add_todo";
        addTodoButton.className = "button_add_todo";
        addTodoButton.textContent = "Add new todo";

        addTodoContainer.append(addInputTodoText, addTodoButton);
        divUserUI.append(messageEmpyTodo, addTodoContainer);
        divFather.append(divUserUI);

        addInputTodoText.addEventListener('input', (e) => {
            todoText = e.target.value;
        })
        addTodoButton.addEventListener('click', () => {
            data.push({
                "id": Date.now(),
                "todo": todoText,
                "completed": false,
                "userId": loginData.id,
            });
            localStorage.setItem("todoList", JSON.stringify(data));
            divFather.textContent = "";
            CreateTodoUserInterface(JSON.parse(localStorage.getItem("todoList")), loginData, divFather);
        })
    }
}