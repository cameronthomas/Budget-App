var express = require('express');
var ip = require('ip')
var port = ip.address() == "159.65.75.194" ? 80 : 3000
var app = express();

app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

/**
* Homepage
*/
app.get('/', function (req, res) {
	res.render('index', {})
});

/**
* Get info for specific budget
*/
app.get('/budgetInfo', function (req, res) {
		res.send('This request will get the information for a specific budget')
	res.end()
});

/**
* Create a new budget
*/
app.post('/createBudget', function (req, res) {
  res.send('This is the post to create a new budget\n')
})

/**
* Create a new transaction
*/
app.post('/createTransaction', function (req, res) {
  res.send('This is the post to create a new transaction\n')
})

/**
* Start server
*/
app.listen(port, function () {
	console.log('Example app listening on port ' + port + '!')
})
