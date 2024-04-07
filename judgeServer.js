import express from 'express';
import { fork } from 'child_process';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/score', (req, res) => {
  const userCode = req.body.code;

  const child = fork('index.js', [], { execArgv: ['--experimental-modules'] });

  child.send({ code: userCode });

  child.on('message', (result) => {
    res.json({ score: result.score });

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