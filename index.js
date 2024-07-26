import { validateAllData } from './public/utils/validators.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
const app = express();
const port = 9000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static('public'))

app.get('/registration', async function (_, res) {

  try {
    const basePath = path.resolve(__dirname)
    res.sendFile(path.join(basePath, '/views/registration/index.html'));

  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Erro interno do servidor');
  }
});

app.post('/registration', register);

async function register(req, res) {
  try {
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

app.listen(port, () => {
  console.info('Server iniciado em http://localhost:' + port)
});