import { cE, qS, qSA, CreateTodoUserInterface } from "./utils/fn.js";
import { usersList } from "./utils/credentials.js";

const loginForm = qS('.form_login');
const divForm = qS('.div_login');
const divRoot = qS('.div_root');
const todoList = JSON.parse(localStorage.getItem("todoList")) || [];

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const loginApproved = usersList.find(
        (user) =>
            user.username === e.srcElement[0].value && user.password === e.srcElement[1].value
    );
    if (loginApproved == undefined) {
        alert("Username e/o password non corretta");
        e.srcElement[0].value = "";
        e.srcElement[1].value = "";
    }
    else {
        divForm.className = "div_login_no_display";
        CreateTodoUserInterface(todoList,loginApproved,divRoot)
    }
})