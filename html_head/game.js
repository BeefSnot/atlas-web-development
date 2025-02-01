document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const player = { x: 50, y: 50, size: 20, color: 'blue', speed: 5 };
    const enemies = [];
    let gameData = { score: 0 };

    function drawPlayer() {
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.size, player.size);
    }

    function drawEnemies() {
        ctx.fillStyle = 'red';
        enemies.forEach(enemy => {
            ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
        });
    }

    function spawnEnemy() {
        const size = 20;
        const x = Math.random() * (canvas.width - size);
        const y = Math.random() * (canvas.height - size);
        enemies.push({ x, y, size });
    }

    function moveEnemies() {
        enemies.forEach(enemy => {
            const dx = player.x - enemy.x;
            const dy = player.y - enemy.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const speed = 2;

            enemy.x += (dx / distance) * speed;
            enemy.y += (dy / distance) * speed;
        });
    }

    function checkCollisions() {
        enemies.forEach((enemy, index) => {
            const collides = player.x < enemy.x + enemy.size &&
                             player.x + player.size > enemy.x &&
                             player.y < enemy.y + enemy.size &&
                             player.y + player.size > enemy.y;
            if (collides) {
                enemies.splice(index, 1);
                gameData.score++;
            }
        });
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayer();
        drawEnemies();
        moveEnemies();
        checkCollisions();
        ctx.font = '30px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(`Score: ${gameData.score}`, 10, 50);
        requestAnimationFrame(gameLoop);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') player.y -= player.speed;
        if (e.key === 'ArrowDown') player.y += player.speed;
        if (e.key === 'ArrowLeft') player.x -= player.speed;
        if (e.key === 'ArrowRight') player.x += player.speed;
    });

    setInterval(spawnEnemy, 2000);
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