import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 3001;

app.get('/categories', (req,res) => {

});

app.get('/videos', (req,res) => {

})

app.get('/videos/:id', (req,res) => {

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
