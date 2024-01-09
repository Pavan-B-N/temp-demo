const ytdl = require('ytdl-core');
const fs = require('fs');
require('dotenv').config();

const port =process.env.PORT ||  3000;


const express = require('express');
const app = express();
app.use(express.json());
const downloadAudio = (url) => {
    const video = ytdl(url, { quality: 'highestaudio', filter: 'audioonly' });

    video.pipe(fs.createWriteStream('audio.mp3'));

    video.on('end', () => {
        console.log('Audio download completed.');
    });

    video.on('error', (err) => {
        console.error(`Error downloading audio: ${err.message}`);
    });
};

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/download', (req, res) => {
    const { link } = req.body;
    downloadAudio(link);
    res.send('Downloading audio...');
})

app.listen(port, () => {
    console.log('Server listening on port 3000');
})
