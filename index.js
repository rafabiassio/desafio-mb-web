const { validateAllData } = require('./utils/validators');
const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const port = 9000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/registration', async function (_, res) {

  try {
    const basePath = require('path').resolve(__dirname)
    res.sendFile(path.join(basePath, '/views/registration/index.html'));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Erro interno do servidor');
  }
});

app.post('/registration', register);

app.listen(port, () => {
  console.info('Server iniciado em http://localhost:' + port)
});

async function register(req, res) {
  try {
    console.log(req.body)
    const data = req.body
    const errors = validateAllData(data)

    if (!errors.length > 0) {
      res.json({ message: 'Usuário registrado com sucesso!' })
    } else {
      return res.status(400).json(errors)
    }
  } catch (err) {
    res.status(500).json(err);
  }
}