const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'dynastyhosting_t3dbgame',
    password: 'qDM3WCekTRAJa34HE5C3',
    database: 'dynastyhosting_t3dbgame'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

app.post('/save-game', (req, res) => {
    const { password, gameData } = req.body;
    const query = 'REPLACE INTO game_data (password, data) VALUES (?, ?)';
    db.query(query, [password, JSON.stringify(gameData)], (err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

app.post('/load-game', (req, res) => {
    const { password } = req.body;
    const query = 'SELECT data FROM game_data WHERE password = ?';
    db.query(query, [password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json({ gameData: JSON.parse(result[0].data) });
        } else {
            res.sendStatus(404);
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});