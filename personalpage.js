document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem('username') || 'Имя Пользователя';
  const email = localStorage.getItem('email') || 'user@example.com';
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (!isLoggedIn) {
    window.location.href = 'personalaccount.html'; 
    return; 
  }

  document.getElementById('username-display').textContent = username;
  document.getElementById('user-email').textContent = email;

  const logoutBtn = document.getElementById("logoutBtn");
  const audio = document.getElementById("logout-audio");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userSubscriptions');
    localStorage.removeItem('userGoals');
    window.location.href = 'personalaccount.html';
  });
}

const avatarColors = ['#4fc3f7', '#65c178', '#f06292', '#ba68c8', '#ff8a65'];
  const staticColor = '#4fc3f7'; 
  const avatar = document.getElementById('user-avatar');
  avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=${staticColor.replace('#', '')}&color=fff&size=120`;

  const arrayList = document.getElementById('array-list');
  const addItemBtn = document.getElementById('add-item-btn');
  const newItemInput = document.getElementById('new-item');
  const arrayMessage = document.getElementById('array-message');

  let goals = JSON.parse(localStorage.getItem('userGoals')) || [];

  function renderGoals() {
    arrayList.innerHTML = '';
    if (goals.length === 0) {
      const li = document.createElement('li');
      li.className = 'list-group-item list-group-item-info text-center';
      li.textContent = 'У вас пока нет целей. Добавьте первую цель!';
      arrayList.appendChild(li);
    } else {
      goals.forEach((goal, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center list-group-item-dark';
        li.textContent = goal;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-danger';
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteBtn.addEventListener('click', () => {
          goals.splice(index, 1);
          saveGoals();
          renderGoals();
          showMessage('Цель удалена.', 'secondary', 'array-message');
        });

        li.appendChild(deleteBtn);
        arrayList.appendChild(li);
      });
    }
  }

  function saveGoals() {
    localStorage.setItem('userGoals', JSON.stringify(goals));
  }

  addItemBtn.addEventListener('click', function () {
    const newGoal = newItemInput.value.trim();

    if (newGoal === '') {
      showMessage('Пожалуйста, введите цель.', 'warning', 'array-message');
      return;
    }

    if (goals.includes(newGoal)) {
      showMessage('Эта цель уже существует!', 'danger', 'array-message');
      return;
    }

    goals.push(newGoal);
    saveGoals();
    renderGoals();
    showMessage('Новая цель успешно добавлена!', 'success', 'array-message');
    newItemInput.value = '';
  });

  let userSubscriptions = JSON.parse(localStorage.getItem('userSubscriptions')) || {
    training: null,
    nutrition: null
  };

  const currentPlansCard = document.getElementById('current-plans-card');
  const nutritionPlanCard = document.getElementById('nutrition-plan-card');
  const currentPlansDisplay = document.getElementById('current-plans-display');
  const nutritionPlanDisplay = document.getElementById('nutrition-plan-display');

  const clearTrainingPlanBtn = document.getElementById('clear-training-plan-btn');
  const clearNutritionPlanBtn = document.getElementById('clear-nutrition-plan-btn');

  const staticCards = document.querySelectorAll('.stats-section .stat-card, .stats-section .health-status-card');
  staticCards.forEach(card => card.classList.add('d-none'));


  function saveSubscriptions() {
    localStorage.setItem('userSubscriptions', JSON.stringify(userSubscriptions));
  }

  function renderSubscriptions() {
    currentPlansCard.classList.add('d-none');
    nutritionPlanCard.classList.add('d-none');
    clearTrainingPlanBtn.classList.add('d-none');
    clearNutritionPlanBtn.classList.add('d-none');

    if (userSubscriptions.training) {
      currentPlansDisplay.textContent = `${userSubscriptions.training}`;
      currentPlansCard.classList.remove('d-none');
      clearTrainingPlanBtn.classList.remove('d-none');
    } else {
      currentPlansDisplay.textContent = 'План тренировок не выбран.';
    }

    if (userSubscriptions.nutrition) {
      nutritionPlanDisplay.textContent = `${userSubscriptions.nutrition}`;
      nutritionPlanCard.classList.remove('d-none');
      clearNutritionPlanBtn.classList.remove('d-none');
    } else {
      nutritionPlanDisplay.textContent = 'План питания не выбран.';
    }

    document.querySelectorAll('.subscription-selection-section .btn-group button').forEach(button => {
      const planType = button.dataset.planType;
      const planName = button.dataset.planName;

      button.classList.remove('active', 'btn-primary', 'btn-success');
      if (planType === 'training') {
        button.classList.add('btn-outline-primary');
      } else {
        button.classList.add('btn-outline-success');
      }

      if (userSubscriptions[planType] === planName) {
        button.classList.add('active');
        if (planType === 'training') {
          button.classList.remove('btn-outline-primary');
          button.classList.add('btn-primary');
        } else {
          button.classList.remove('btn-outline-success');
          button.classList.add('btn-success');
        }
      }
    });
  }

  document.querySelectorAll('.subscription-selection-section .btn-group button').forEach(button => {
    button.addEventListener('click', function() {
      const planType = this.dataset.planType;
      const planName = this.dataset.planName;

      userSubscriptions[planType] = planName;
      saveSubscriptions();
      renderSubscriptions(); 
      showMessage(`Вы выбрали план: "${planName}" для ${planType === 'training' ? 'тренировок' : 'питания'}.`, 'success', 'subscription-message');
    });
  });

  clearTrainingPlanBtn.addEventListener('click', function() {
    userSubscriptions.training = null;
    saveSubscriptions();
    renderSubscriptions();
    showMessage('План тренировок удален.', 'secondary', 'subscription-message');
  });

  clearNutritionPlanBtn.addEventListener('click', function() {
    userSubscriptions.nutrition = null;
    saveSubscriptions();
    renderSubscriptions();
    showMessage('План питания удален.', 'secondary', 'subscription-message');
  });


  function showMessage(message, type, elementId) {
    const messageElement = document.getElementById(elementId);
    if (messageElement) {
      messageElement.textContent = message;
      messageElement.className = `alert alert-${type}`;
      messageElement.classList.remove('d-none');
      setTimeout(() => {
        messageElement.classList.add('d-none');
      }, 3000);
    }
  }

  renderGoals(); 
  renderSubscriptions(); 
});