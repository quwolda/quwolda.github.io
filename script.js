const USER_ID = '907600092666671115'; 

fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`)
  .then(response => response.json())
  .then(res => {
    if (!res.success) {
        console.error("Lanyard API вернул ошибку. Ты зашел на их сервер?");
        return;
    }
    const data = res.data;
    const user = data.discord_user;
    const avatarElement = document.getElementById('discord-avatar');
    const nameElement = document.getElementById('discord-name');
    const statusDot = document.getElementById('status-dot');
    const status = data.discord_status; // Получаем статус: online, idle, dnd или offline

    statusDot.className = 'status-dot'; // Сбрасываем старые классы
    if (status) {
        statusDot.classList.add(`status-${status}`);
    }

    if (user) {
        nameElement.innerText = user.global_name || user.username;
    }

    if (user && user.avatar) {
        // Используем .webp — он легче и лучше поддерживается Discord
        const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=256`;
        avatarElement.src = avatarUrl;
        console.log("Аватар успешно загружен:", avatarUrl);
    } else {
        avatarElement.src = 'img/icon.png'; // Твоя иконка из проекта
    }
  })
  .catch(error => {
    console.error("Ошибка сети или API:", error);
  });