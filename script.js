/**
 * Конфигурация: ID пользователя Discord.
 * Профиль: Quwolda
 */
const USER_ID = '907600092666671115'; 

/**
 * Основная функция получения данных через Lanyard API.
 * Lanyard проксирует данные из твоего Discord профиля в реальном времени.
 */
fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`)
  .then(response => response.json())
  .then(res => {
    // 1. ПРОВЕРКА ОТВЕТА
    // Если success: false, скорее всего указанный профиль не находится на сервере Lanyard
    if (!res.success) {
        console.error("Lanyard API вернул ошибку. Проверь, находится ли указанный профиль в их Discord сервере.");
        return;
    }

    // 2. ИЗВЛЕЧЕНИЕ ДАННЫХ
    const data = res.data;
    const user = data.discord_user; // Базовые данные (ник, аватар, ID)
    const status = data.discord_status; // Текущий статус (online, idle, dnd, offline)

    // 3. ПОИСК ЭЛЕМЕНТОВ В HTML
    const avatarElement = document.getElementById('discord-avatar');
    const nameElement = document.getElementById('discord-name');
    const statusDot = document.getElementById('status-dot');

    // 4. ОБНОВЛЕНИЕ НИКНЕЙМА
    // Используем 'global_name' (отображаемое имя), если его нет — обычный 'username'
    if (user) {
        nameElement.innerText = user.global_name || user.username;
    }

    // 5. ОБНОВЛЕНИЕ СТАТУСА (Цветной индикатор)
    // Сначала сбрасываем классы до базового 'status-dot', затем добавляем класс конкретного статуса
    statusDot.className = 'status-dot'; 
    if (status) {
        statusDot.classList.add(`status-${status}`); // Добавит например 'status-online'
    }

    // 6. ЗАГРУЗКА АВАТАРКИ
    // Собираем прямую ссылку на CDN Discord. Формат .webp лучше всего сжат
    if (user && user.avatar) {
        const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=256`;
        avatarElement.src = avatarUrl;
        console.log("Аватар успешно загружен:", avatarUrl);
    } else {
        // Запасной вариант: если аватара нет, ставим иконку проекта
        avatarElement.src = 'img/icon.png'; 
    }
  })
  .catch(error => {
    // Обработка критических ошибок (например, пропал интернет)
    console.error("Ошибка сети или выполнения скрипта:", error);
  });