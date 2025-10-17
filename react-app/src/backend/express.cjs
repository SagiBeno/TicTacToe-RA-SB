const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const results = [];

app.get('/api/results', (req, res) => {
    res.status(200).json(results);
});

app.post('/api/result', (req, res) => {
    const { result } = req.body;
    results.push(result);
    res.status(201).json(results);
});

const port = 3333;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});