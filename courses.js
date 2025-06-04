const plansData = {
    'weight-loss-fitness': {
        title: 'Weight Loss & Fat Burning',
        type: 'Фитнес программа',
        duration: '4 недели',
        price: '15,000 ₸',
        description: 'Сжигайте калории, уменьшайте жировую массу и улучшайте сердечно-сосудистое здоровье за 4 недели.',
        features: ['Персональный план тренировок', 'Кардио и силовые упражнения', 'Отслеживание прогресса', 'Поддержка тренера']
    },
    'muscle-building-fitness': {
        title: 'Muscle Building',
        type: 'Фитнес программа',
        duration: '6 недель',
        price: '20,000 ₸',
        description: 'Увеличивайте мышечную массу и рельеф с контролируемыми повторениями за 6 недель.',
        features: ['Программа силовых тренировок', 'План питания для роста мышц', 'Техника выполнения упражнений', 'Еженедельные консультации']
    },
    'strength-training': {
        title: 'Strength Training',
        type: 'Фитнес программа',
        duration: '8 недель',
        price: '25,000 ₸',
        description: 'Увеличивайте силу с помощью тяжелых подъемов в 8-недельной программе.',
        features: ['Прогрессивные нагрузки', 'Техника безопасности', 'Индивидуальный подход', 'Контроль результатов']
    },
    'endurance-fitness': {
        title: 'Endurance & Stamina',
        type: 'Фитнес программа',
        duration: '6 недель',
        price: '18,000 ₸',
        description: 'Улучшайте сердечно-сосудистую и мышечную выносливость в 6-недельном тренировочном плане.',
        features: ['Кардио тренировки', 'Интервальные нагрузки', 'Дыхательные техники', 'Мониторинг пульса']
    },
    'flexibility-fitness': {
        title: 'Flexibility & Mobility',
        type: 'Фитнес программа',
        duration: 'Ежедневно',
        price: '12,000 ₸',
        description: 'Улучшайте подвижность суставов и предотвращайте травмы с ежедневными упражнениями.',
        features: ['Растяжка и йога', 'Мобильность суставов', 'Профилактика травм', 'Релаксация']
    },
    'functional-fitness': {
        title: 'Functional Fitness',
        type: 'Фитнес программа',
        duration: '4 недели',
        price: '16,000 ₸',
        description: 'Тренируйтесь для реальных жизненных движений в 4-недельной программе.',
        features: ['Функциональные движения', 'Баланс и координация', 'Практичные упражнения', 'Улучшение качества жизни']
    },
    'general-fitness': {
        title: 'General Fitness Maintenance',
        type: 'Фитнес программа',
        duration: '8 недель',
        price: '22,000 ₸',
        description: 'Поддерживайте общую физическую форму и здоровье со сбалансированным 8-недельным планом.',
        features: ['Комплексный подход', 'Разнообразные тренировки', 'Поддержание формы', 'Здоровый образ жизни']
    },
    'weight-loss-nutrition': {
        title: 'Weight Loss & Fat Burning',
        type: 'План питания',
        duration: '4 недели',
        price: '10,000 ₸',
        description: 'Сохраняйте мышечную массу, уменьшая жир с помощью структурированного плана питания.',
        features: ['Индивидуальное меню', 'Подсчет калорий', 'Рецепты блюд', 'Список покупок']
    },
    'muscle-building-nutrition': {
        title: 'Muscle Building',
        type: 'План питания',
        duration: '6 недель',
        price: '12,000 ₸',
        description: 'Подпитывайте рост мышц высоким содержанием белка и избытком калорий.',
        features: ['Высокобелковое питание', 'Калорийный профицит', 'Спортивные добавки', 'График приема пищи']
    },
    'strength-nutrition': {
        title: 'Strength & Power Training',
        type: 'План питания',
        duration: '8 недель',
        price: '14,000 ₸',
        description: 'Оптимизируйте тяжелые подъемы с помощью богатой питательными веществами диеты.',
        features: ['Питание для силы', 'Энергетические продукты', 'Восстановление мышц', 'Предтренировочное питание']
    },
    'endurance-nutrition': {
        title: 'Endurance Training',
        type: 'План питания',
        duration: '6 недель',
        price: '11,000 ₸',
        description: 'Поддерживайте длительные тренировки с высокоуглеводным энергетическим планом.',
        features: ['Углеводная загрузка', 'Гидратация', 'Энергетические напитки', 'Питание во время тренировок']
    },
    'maintenance-nutrition': {
        title: 'Maintenance & General Health',
        type: 'План питания',
        duration: 'Постоянно',
        price: '9,000 ₸',
        description: 'Оставайтесь здоровыми со сбалансированным питанием для долгосрочного благополучия.',
        features: ['Сбалансированное меню', 'Здоровые привычки', 'Разнообразие продуктов', 'Поддержание веса']
    }
};

function openPlanModal(planId) {
    const plan = plansData[planId];
    if (!plan) return;
    
    document.getElementById('modal-plan-title').textContent = plan.title;
    document.getElementById('modal-plan-type').textContent = plan.type;
    document.getElementById('modal-plan-duration').textContent = plan.duration;
    document.getElementById('modal-plan-price').textContent = plan.price;
    document.getElementById('modal-plan-description').textContent = plan.description;
    
    const featuresList = document.getElementById('modal-features-list');
    featuresList.innerHTML = '';
    plan.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    const modal = new bootstrap.Modal(document.getElementById('planModal'));
    modal.show();
}

document.addEventListener('DOMContentLoaded', function() {
    const fitnessCards = document.querySelectorAll('#fitness-programs .card-custom');
    const nutritionCards = document.querySelectorAll('#nutrition-plans .card-custom');
    
    const fitnessPlans = [
        'weight-loss-fitness',
        'muscle-building-fitness', 
        'strength-training',
        'endurance-fitness',
        'flexibility-fitness',
        'functional-fitness',
        'general-fitness'
    ];
    
    fitnessCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            e.preventDefault();
            openPlanModal(fitnessPlans[index]);
        });
    });
    
    const nutritionPlans = [
        'weight-loss-nutrition',
        'muscle-building-nutrition',
        'strength-nutrition',
        'endurance-nutrition',
        'maintenance-nutrition'
    ];
    
    nutritionCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            e.preventDefault();
            openPlanModal(nutritionPlans[index]);
        });
    });
    
    document.getElementById('order-plan-btn').addEventListener('click', function() {
        const modal = bootstrap.Modal.getInstance(document.getElementById('planModal'));
        modal.hide();
        
        setTimeout(() => {
            window.location.href = 'personalaccount.html';
        }, 300);
    });
});