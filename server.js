const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const playerController = require('./controllers/player.controller');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const publicPath = path.join(__dirname, 'client', 'build');

app.use(bodyParser.json());

app.get('/api/v1/players', (req, res) => {
    playerController.getPlayers().then((players) => res.json(players));
})

app.get('/api/v1/player/:id', (req, res) => {
    const id = req.params.id;
    playerController.getPlayerById(id).then((player) => res.json(player));
})

// serve static assets in prod

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    // catch all
    app.get('*', (req, res) => {
        res.sendFile(path.join(publicPath, 'index.html'));
    })
}

app.listen(port, () => {
    console.log(`Server is up on: ${port}`)
})