require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');
const ytdl = require('ytdl-core');
const fs = require('fs');

const app = express();
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

const questions = [
    { en: "Add a title to this text", es: "Puedes generarme un titulo para este texto?" },
    { en: "give me a 200 words summary to this text", es: "Puedes generar un resumen de 200 palabras para este texto?" },
    { en: "give me a quiz with 5 multiple options questions taken from the text and the results", es: "dame un quiz de 5 preguntas multiple opcion y el resultado relativas al texo que te pase" }
]

app.get('/transcribe', async (req, res) => {

    const lang = req.query.lang || 'en';
    const videoId = req.query.videoId;

    console.log("lang", lang);
    console.log("videoId", videoId);

    try {
        const url = `https://www.youtube.com/watch?v=${videoId}`
        if (!ytdl.validateURL(url)) {
            return res.status(400).send('Invalid URL');
        }

        const info = await ytdl.getInfo(url);
        const audioFormat = ytdl.chooseFormat(info.formats, { filter: 'audioonly', quality: 'highestaudio' });
        console.log("audioFormat")
        if (audioFormat) {
            const audioStream = ytdl(url, { format: audioFormat });
            const transcribedText = await transcribeAudio(audioStream);

            const title = await getTitleFromText(transcribedText, lang)
            const paragraphs = await getSummaryFromText(transcribedText, lang)
            const quizes = await getQuizFromText(transcribedText, lang)

            const htmlResponse = createHTMLResponse(title, paragraphs, quizes);

            res.send(htmlResponse);
        } else {
            res.status(400).send('No audio found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

function createHTMLResponse(title, paragraphs, quizes) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f0f0f0;
            }

            .container {
                width: 60%;
                margin: auto;
                overflow: hidden;
                padding: 30px;
                background: #fff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }

            h2 {
                color: #333;
            }

            p {
                line-height: 1.6;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>${title}</h2>
            ${paragraphs}

            <hr>
            <pre>${quizes}</pre>
        </div>
    </body>
    </html>
`;
}

async function transcribeAudio(audioStream) {
    const filePath = 'audio.mp4';
    await saveAudioToFile(audioStream, filePath);
    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: "whisper-1",
    });
    return transcription.text;
}

function saveAudioToFile(stream, filePath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
        stream.pipe(file);
        file.on('finish', resolve);
        file.on('error', reject);
    });
}

async function getResponseFromOpenAI(transcribedText, question, max_tokens) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": transcribedText
                },
                {
                    "role": "user",
                    "content": question
                },
            ],
            temperature: 0,
            max_tokens,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        return response.choices[0].message.content;
    } catch (e) {
        console.error("error generating response", e)
        return 'error';
    }
}

async function getTitleFromText(transcribedText, lang) {
    console.log("getTitleFromText", questions[0][lang]);
    return getResponseFromOpenAI(transcribedText, questions[0][lang], 256);
}

async function getSummaryFromText(transcribedText, lang) {
    const content = await getResponseFromOpenAI(transcribedText, questions[1][lang], 512);
    return content.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('');
}

async function getQuizFromText(transcribedText, lang) {
    const content = await getResponseFromOpenAI(transcribedText, questions[2][lang], 512);
    console.log(content);
    return content.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('');
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
