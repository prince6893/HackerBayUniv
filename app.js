var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({    
  extended: true
}));
var requestData;
app.get('/', function (req, res) {
  console.log("pass");
  res.status(200);
  res.json({status:"success"})
});

app.post('/data', function (req, res) {
//console.log(req);
console.log("Request Body : ");
console.log(req.body);
requestData=req.body.data;
res.status(200);
res.send(req.body);
});


app.get('/data', function (req, res) {
res.status(200);
res.send({data:requestData});
});



app.listen(3003, function () {
  console.log('Example app listening on port 3003!');
});
