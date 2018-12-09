var request = require("request")

//send a node js request
module.exports = function callOpenALPR(req, onSucess, onError){
  var options = { 
    method: 'POST',
    url: 'https://api.openalpr.com/v2/recognize?recognize_vehicle=1&country=nz&secret_key=sk_c947981879885247c6cb163a',
    qs: 
      { recognize_vehicle: '1',
        country: 'nz',
        secret_key: 'sk_c947981879885247c6cb163a' },
    headers: 
      { 'Postman-Token': '23998f06-ec78-4cc0-873a-423ea6f7b95c',
        'cache-control': 'no-cache',
        'content-type': 'multipart/form-data' },
    formData: 
      { image: 
        { value: req.file.buffer,
          options: 
          { filename: 'image.jpg', 
            contentType: 'multipart/form-data'
          }
        } 
      }         
  };
  request.post(options, function (error, response, body) {
    if (error) {
      onError(error);
    }
    else{
      var data = JSON.parse(body);
      plateNum = JSON.stringify(data.results, ['plate']);
      onSucess(plateNum);
    }
  });
}



