let registeredUser = JSON.parse(localStorage.getItem('registeredUser')) || null;

function toggleForms(event) {
    if (event) event.preventDefault();
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    }
}

$(document).ready(function () {
    document.getElementById("register-form").style.display = "none";

    $("#loginForm").submit(function (e) {
        e.preventDefault();

        const username = $("#username").val();
        const password = $("#password").val();

        if (!registeredUser) {
            alert("Сначала зарегистрируйтесь!");
            toggleForms();
            return;
        }

        if (username === registeredUser.username && password === registeredUser.password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            localStorage.setItem('email', registeredUser.email);
            window.location.href = "personalpage.html";
        } else {
            alert("Ошибка: неверный логин или пароль");
        }
    });
});

function register() {
    const regUsername = document.getElementById("reg-username").value;
    const regPassword = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-confirm").value;

    if (!regUsername || !regPassword || !confirmPassword) {
        alert("Все поля обязательны для заполнения!");
        return;
    }

    if (regPassword !== confirmPassword) {
        alert("Пароли не совпадают!");
        return;
    }

    const regEmail = document.getElementById("reg-email").value;

registeredUser = {
    username: regUsername,
    password: regPassword,
    email: regEmail,
    plans: {
        nutrition: null,
        workout: null
    }
};

    localStorage.setItem('registeredUser', JSON.stringify(registeredUser));

    alert("Регистрация успешна! Теперь вы можете войти.");

    document.getElementById("reg-username").value = "";
    document.getElementById("reg-password").value = "";
    document.getElementById("reg-confirm").value = "";

    toggleForms();
}
