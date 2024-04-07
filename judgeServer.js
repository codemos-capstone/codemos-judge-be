import express from 'express';
import { fork } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/score', (req, res) => {
  const userCode = req.body.code;

  const child = fork('index.js', [], { execArgv: ['--experimental-modules'] });

  child.send({ code: userCode });

  child.on('message', (result) => {
    res.json({ 
      score: result.score,
      fuel: result.fuel,
      time: result.time
     });

    child.kill();
  });

  child.on('error', (error) => {
    console.error('Error process:', error);
    res.status(500).json({ error: 'error' });
  });
});

app.listen(port, () => {
  console.log(`port ${port}`);
});