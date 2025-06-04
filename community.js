$(document).ready(function() {
    loadThemes();
    
    $('.btn-create-topic').click(function() {
        $('.new-theme-form-container').addClass('show');
    });
    
    $('.btn-cancel-theme').click(function() {
        $('.new-theme-form-container').removeClass('show');
    });
    
    $('#themeForm').submit(function(e) {
        e.preventDefault();
        
        const title = $('#themeTitle').val();
        const category = $('#themeCategory').val();
        const content = $('#themeContent').val();
        
        const newTheme = {
            id: Date.now(),
            title: title,
            category: category,
            content: content,
            author: '@currentUser',
            replies: 0,
            views: 1,
            date: new Date().toLocaleDateString()
        };
        
        saveTheme(newTheme);
        
        addThemeToPage(newTheme);
        
        alert('New theme created successfully!');
        
        $('.new-theme-form-container').removeClass('show');
        this.reset();
    });
    
    $('.new-theme-form-container').click(function(e) {
        if (e.target === this) {
            $(this).removeClass('show');
        }
    });
});

function saveTheme(theme) {
    let themes = JSON.parse(localStorage.getItem('forumThemes')) || [];
    themes.push(theme);
    localStorage.setItem('forumThemes', JSON.stringify(themes));
}

function loadThemes() {
    const themes = JSON.parse(localStorage.getItem('forumThemes')) || [];
    themes.forEach(theme => {
        addThemeToPage(theme);
    });
}

function addThemeToPage(theme) {
    const categoryMap = {
        'Workout': 'Тренировки',
        'Nutrition': 'Питание',
        'Motivation': 'Мотивация',
        'Other': 'Другое'
    };
    
    const displayCategory = categoryMap[theme.category] || theme.category;
    
    const newCard = `
        <div class="card forum-card p-3" data-theme-id="${theme.id}">
            <div class="d-flex justify-content-between align-items-center">
                <h5>${theme.title}</h5>
                <span class="category-tag">${displayCategory}</span>
            </div>
            <p class="mt-2">${theme.content}</p>
            <small><i class="fas fa-user"></i> ${theme.author} • ${theme.replies} ответов • ${theme.views} просмотров</small>
            <button class="btn btn-sm btn-danger mt-2 delete-theme" onclick="deleteTheme(${theme.id})">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    
    $('.forum-header').after(newCard);
}

function deleteTheme(themeId) {
    if (confirm('Are you sure you want to delete this theme?')) {
        let themes = JSON.parse(localStorage.getItem('forumThemes')) || [];
        themes = themes.filter(theme => theme.id !== themeId);
        localStorage.setItem('forumThemes', JSON.stringify(themes));
        
        $(`[data-theme-id="${themeId}"]`).fadeOut(300, function() {
            $(this).remove();
        });
    }
}
function clearAllThemes() {
    if (confirm('Are you sure you want to delete all custom themes?')) {
        localStorage.removeItem('forumThemes');
        location.reload();
    }
}