var express = require('express');
var ip = require('ip')
var port = ip.address() == "159.65.75.194" ? 80 : 3000
var db = require('./db/index')
var app = express();

app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

/**
* Homepage
*/
app.get('/', function (req, res) {
	res.render('index', {name: "yo bro"})
	db.selectBudgets()
});

/**
* Get info for specific budget
*/
app.get('/budgetInfo', function (req, res) {
		res.send('This request will get the information for a specific budget')
		db.selectBudgetTransactions()
	res.end()
});

/**
* Create a new budget
*/
app.post('/createBudget', function (req, res) {
  res.send('This is the post to create a new budget\n')
	db.insertBudget()
})

/**
* Create a new transaction
*/
app.post('/createTransaction', function (req, res) {
  res.send('This is the post to create a new transaction\n')
	db.insertTransaction()
})

// Handle 404
app.use(function (req, res, next) {
  res.status(404).send("Oops, we can't find what you are looking for!")
})

/**
* Start server
*/
app.listen(port, function () {
	console.log('Example app listening on port ' + port + '!')
})
