import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
app.use(cors());
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const data = JSON.parse(
  readFileSync(join(__dirname, 'data', 'videos.json'), 'utf8')
);

app.get('/categories', (req, res) => {
  res.json(data.categories);
});

app.get('/videos', (req, res) => {
  const { category } = req.query;

  // return all videos if no category query param
  if (!category) {
    return res.json(data.videos);
  }

  const filteredVideos = data.videos.filter(
    (video) => video.category.toLowerCase() === category.toLowerCase()
  );

  res.json(filteredVideos);
});

app.get('/videos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const video = data.videos.find((video) => video.id === id);

  if (!video) {
    return res.status(404).json({ error: 'video not found' });
  }

  res.json(video);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
