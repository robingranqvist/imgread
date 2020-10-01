//IMPORTS
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const Tesseract = require('tesseract.js');

app.use(cors());

app.use("/", express.static(__dirname + '/public'));

const url = 'https://i2.wp.com/www.enligto.se/wp-content/uploads/2013/03/Sk%C3%A4rmavbild-2013-03-01-kl.-21.44.21.png?resize=738%2C380';
const lang = 'swe';

app.post('/', (req, res) => {
    Tesseract.recognize(req.body.url, 'swe', 
        { 
            logger: m => console.log(m.progress) 
        }
    ).then(({ data: { text } }) => {
        res.json(text);
    }).catch((err) => {
        res.json(err);
    });
});

app.listen(process.env.PORT || 3000);