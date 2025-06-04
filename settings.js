document.addEventListener('DOMContentLoaded', () => {
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const messageBox = document.getElementById('save-message');

  usernameInput.value = localStorage.getItem('username') || '';
  emailInput.value = localStorage.getItem('email') || '';

  document.getElementById('settings-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();

    if (!username || !email) {
      showMessage('Пожалуйста, заполните все поля!', 'danger');
      return;
    }

    if (!validateEmail(email)) {
      showMessage('Пожалуйста, введите корректный email!', 'danger');
      return;
    }

    localStorage.setItem('username', username);
    localStorage.setItem('email', email);

    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));
    if (registeredUser) {
      registeredUser.username = username;
      localStorage.setItem('registeredUser', JSON.stringify(registeredUser));
    }

    showMessage('Изменения сохранены успешно!', 'success');

    setTimeout(() => {
      messageBox.classList.add('d-none');
      window.location.href = 'personalaccount.html';
    }, 1500);
  });

  document.getElementById('password-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));
    
    if (!registeredUser) {
      showMessage('Пользователь не найден! Войдите в систему заново.', 'danger');
      return;
    }
    
    const storedPassword = registeredUser.password;
    
    console.log('Введенный пароль:', currentPassword);
    console.log('Сохраненный пароль:', storedPassword);
    
    if (currentPassword !== storedPassword) {
      showMessage('Неверный текущий пароль!', 'danger');
      return;
    }
    
    if (newPassword.length < 6) {
      showMessage('Новый пароль должен содержать минимум 6 символов!', 'danger');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      showMessage('Новые пароли не совпадают!', 'danger');
      return;
    }
    
    if (newPassword === currentPassword) {
      showMessage('Новый пароль должен отличаться от текущего!', 'warning');
      return;
    }
    
    registeredUser.password = newPassword;
    localStorage.setItem('registeredUser', JSON.stringify(registeredUser));
    
    console.log('Пароль успешно обновлен');
    
    showMessage('Пароль успешно изменен!', 'success');
    
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
    
    setTimeout(() => {
      messageBox.classList.add('d-none');
    }, 3000);
  });

  function showMessage(message, type) {
    messageBox.textContent = message;
    messageBox.className = `alert alert-${type} mt-3`;
    messageBox.classList.remove('d-none');
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});

function togglePassword(inputId) {
  const passwordInput = document.getElementById(inputId);
  const toggleIcon = passwordInput.nextElementSibling.querySelector('i');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.classList.remove('fa-eye');
    toggleIcon.classList.add('fa-eye-slash');
  } else {
    passwordInput.type = 'password';
    toggleIcon.classList.remove('fa-eye-slash');
    toggleIcon.classList.add('fa-eye');
  }
}