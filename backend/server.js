const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

let jokes = [
  "Why don't skeletons fight each other? They don't have the guts.",
  "Why did the scarecrow win an award? He was outstanding in his field.",
  "What do you call fake spaghetti? An impasta!",
  "Why don’t scientists trust atoms? Because they make up everything!",
  "What do you call cheese that isn't yours? Nacho cheese.",
  "Why did the bicycle fall over? It was two tired!",
  "Why don’t programmers like nature? Too many bugs.",
  "How do you organize a space party? You planet.",
  "Why don’t eggs tell jokes? They’d crack each other up.",
  "How does a penguin build its house? Igloos it together."
];

let lastRequestTime = Date.now();

const refreshJokes = () => {
  jokes = jokes.map(joke => `${joke} 😂`);
  lastRequestTime = Date.now();
};

app.get('/joke', (req, res) => {
  if (Date.now() - lastRequestTime > 10 * 60 * 1000) {
    refreshJokes();
  }
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  res.json({ joke: randomJoke });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
