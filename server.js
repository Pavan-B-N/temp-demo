const ytdl = require('ytdl-core');
const fs = require('fs');
require('dotenv').config();

const port = process.env.PORT || 3000;


const express = require('express');
const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/download', (req, res) => {
    const { link } = req.body;
    try {
        const video = ytdl(link, { quality: 'highestaudio', filter: 'audioonly' });

        video.pipe(fs.createWriteStream('audio.mp3'));

        video.on('end', () => {
            console.log('Audio download completed.');
            return res.status(200).json({ message: 'Audio download completed.', file: 'audio.mp3' });
        });

        video.on('error', (err) => {
            console.error(`Error downloading audio: ${err.message}`);
            return res.status(500).json({ message: 'Error downloading audio' ,error: err.message});
        });
    } catch (err) {
        console.error(`Error downloading audio: ${err.message}`);
        return res.status(500).json({ message: 'Error downloading audio',error: err.message });
    }
})

app.listen(port, () => {
    console.log('Server listening on port 3000');
})
