const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const callOpenALPR = require('./OpenALPRService');

const app = express();
const upload = multer();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//receive image, send img data(buffer) and call openALPR, get the result, send the string result to RN app
app.post('/image', upload.single('avatar'),function(req, res){
  callOpenALPR(req, function(body) {
    res.send(body);
  }, function(err){
    res.send('errrroooorrrr!');
  });
});

//start the app
app.listen(port, function() {
    console.log('Example app listening on port 3000!');
});
