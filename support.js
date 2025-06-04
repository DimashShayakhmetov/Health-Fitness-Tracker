(function() {
    emailjs.init("ITCNuzhfS_nUVSYTY"); 
})();

const EMAIL_CONFIG = {
    serviceID: 'service_r1v1hw7',   
    templateID: 'template_10rwghm',   
    publicKey: 'ITCNuzhfS_nUVSYTY'   
};

function send(event) {
    if (event) {
        event.preventDefault();
    }
    
    console.log('🚀 Начинаем отправку формы...');
    
    const formData = getFormData();
    console.log('📝 Данные формы:', formData);
    
    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
        console.error('❌ Ошибки валидации:', validationErrors);
        showErrorMessage(validationErrors.join('\n'));
        return;
    }
    
    showLoadingState(true);
    
    sendEmailViaService(formData)
        .then(response => {
            console.log('✅ Письмо успешно отправлено!', response);
            showSuccessMessage();
            clearForm();
        })
        .catch(error => {
            console.error('❌ Ошибка отправки:', error);
            showErrorMessage('Произошла ошибка при отправке письма. Попробуйте еще раз.');
        })
        .finally(() => {
            showLoadingState(false);
        });
}

function getFormData() {
    return {
        user_name: document.getElementById('name').value.trim(),
        user_email: document.getElementById('email').value.trim(),
        topic: document.getElementById('topic').value,
        message: document.getElementById('message').value.trim(),
        timestamp: new Date().toLocaleString('ru-RU'),
        page_url: window.location.href
    };
}

function validateFormData(data) {
    const errors = [];
    
    if (!data.user_name) {
        errors.push('• Пожалуйста, введите ваше имя');
    }
    
    if (!data.user_email) {
        errors.push('• Пожалуйста, введите email');
    } else if (!isValidEmail(data.user_email)) {
        errors.push('• Пожалуйста, введите корректный email');
    }
    
    if (!data.topic || data.topic === 'Choose theme' || data.topic === '') {
        errors.push('• Пожалуйста, выберите тему обращения');
    }
    
    if (!data.message) {
        errors.push('• Пожалуйста, введите сообщение');
    } else if (data.message.length < 10) {
        errors.push('• Сообщение должно содержать минимум 10 символов');
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sendEmailViaService(data) {
    const templateParams = {
        user_name: data.user_name,
        user_email: data.user_email,
        topic: data.topic,
        message: data.message,
        timestamp: data.timestamp,
        page_url: data.page_url
    };

    const body = {
        service_id: EMAIL_CONFIG.serviceID,
        template_id: EMAIL_CONFIG.templateID,
        user_id: EMAIL_CONFIG.publicKey,
        template_params: templateParams
    };

    return fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(error?.error || 'Unknown error');
            });
        }
            return response.text(); 
    });
}


function showLoadingState(isLoading) {
    const submitBtn = document.querySelector('.btn-submit');
    
    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitBtn.style.opacity = '0.7';
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send';
        submitBtn.style.opacity = '1';
    }
}

function showSuccessMessage() {
    showNotification('success', '✅ Сообщение успешно отправлено!', 'Мы получили ваше обращение и свяжемся с вами в ближайшее время.');
}

function showErrorMessage(message) {
    showNotification('error', '❌ Ошибка отправки', message);
}

function showNotification(type, title, message) {
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
        font-family: Arial, sans-serif;
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #00e5ff, #1de9b6)';
        notification.style.color = '#000';
    } else {
        notification.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8e8e)';
        notification.style.color = '#fff';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('topic').selectedIndex = 0;
    document.getElementById('message').value = '';
}

function addNotificationStyles() {
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .notification-content {
                padding: 20px;
                position: relative;
            }
            
            .notification-title {
                font-weight: bold;
                font-size: 16px;
                margin-bottom: 8px;
            }
            
            .notification-message {
                font-size: 14px;
                line-height: 1.4;
                white-space: pre-line;
            }
            
            .notification-close {
                position: absolute;
                top: 10px;
                right: 10px;
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.2s;
                color: inherit;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(styles);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Инициализация EmailJS...');
    
    addNotificationStyles();
    
    const form = document.querySelector('#supportForm');
    if (form) {
        form.addEventListener('submit', send);
        console.log('✅ Обработчик формы подключен');
    } else {
        console.error('❌ Форма #supportForm не найдена');
    }
    
    console.log('📧 EmailJS конфигурация:');
    console.log('Service ID:', EMAIL_CONFIG.serviceID);
    console.log('Template ID:', EMAIL_CONFIG.templateID);
    console.log('Public Key:', EMAIL_CONFIG.publicKey);
});

function testEmailIntegration() {
    console.log('🧪 Тестирование конфигурации EmailJS...');
    
    const testData = {
        user_name: 'Test User',
        user_email: 'test@example.com',
        topic: 'technical',
        message: 'Это тестовое сообщение для проверки работы EmailJS',
        timestamp: new Date().toLocaleString('ru-RU'),
        page_url: window.location.href
    };
    
    sendEmailViaService(testData)
        .then(response => {
            console.log('✅ Тест успешен!', response);
        })
        .catch(error => {
            console.error('❌ Тест провален:', error);
        });
}