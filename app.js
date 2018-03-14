var express = require('express');
var ip = require('ip')
var port = ip.address() == "159.65.75.194" ? 80 : 3000
var app = express();



app.get('/', function (req, res) {
	res.send('Hello World!');
    });

app.listen(port, function () {
	console.log('Example app listening on port ' + port + '!')
    })
