document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    let gameData = { score: 0 };

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameData.score++;
        ctx.fillText(`Score: ${gameData.score}`, 10, 50);
        requestAnimationFrame(gameLoop);
    }

    gameLoop();

    document.getElementById('saveGame').addEventListener('click', () => {
        const password = document.getElementById('savePassword').value;
        if (password.length === 6) {
            fetch('/save-game', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, gameData })
            });
        } else {
            alert('Password must be 6 characters long');
        }
    });

    document.getElementById('loadGame').addEventListener('click', () => {
        const password = document.getElementById('savePassword').value;
        if (password.length === 6) {
            fetch('/load-game', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            })
            .then(response => response.json())
            .then(data => {
                gameData = data.gameData;
            });
        } else {
            alert('Password must be 6 characters long');
        }
    });
});