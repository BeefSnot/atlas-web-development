document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    let gameData = { score: 0, player: { x: 50, y: 50, size: 20 }, items: [] };

    function drawPlayer() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(gameData.player.x, gameData.player.y, gameData.player.size, gameData.player.size);
    }

    function drawItems() {
        ctx.fillStyle = 'green';
        gameData.items.forEach(item => {
            ctx.fillRect(item.x, item.y, item.size, item.size);
        });
    }

    function spawnItem() {
        const size = 10;
        const x = Math.random() * (canvas.width - size);
        const y = Math.random() * (canvas.height - size);
        gameData.items.push({ x, y, size });
    }

    function checkCollisions() {
        gameData.items = gameData.items.filter(item => {
            const collides = gameData.player.x < item.x + item.size &&
                             gameData.player.x + gameData.player.size > item.x &&
                             gameData.player.y < item.y + item.size &&
                             gameData.player.y + gameData.player.size > item.y;
            if (collides) {
                gameData.score++;
            }
            return !collides;
        });
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayer();
        drawItems();
        checkCollisions();
        ctx.font = '30px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(`Score: ${gameData.score}`, 10, 50);
        requestAnimationFrame(gameLoop);
    }

    document.addEventListener('keydown', (e) => {
        const speed = 5;
        if (e.key === 'ArrowUp') gameData.player.y -= speed;
        if (e.key === 'ArrowDown') gameData.player.y += speed;
        if (e.key === 'ArrowLeft') gameData.player.x -= speed;
        if (e.key === 'ArrowRight') gameData.player.x += speed;
    });

    setInterval(spawnItem, 1000);
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