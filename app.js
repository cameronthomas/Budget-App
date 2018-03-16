var express = require('express');
var ip = require('ip')
var port = ip.address() == "159.65.75.194" ? 80 : 3000
var db = require('./db/index')
var app = express();
var promise = require('promise')
var bodyParser = require('body-parser')
var jade = require('jade');

// app.set('views', __dirname + '/views')
// app.set('view engine', 'jsx')
// app.engine('jsx', require('express-react-views').createEngine())
//app.set(__dirname)
//console.log(__dirname)
app.set('view engine', 'jade')
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/**
* Homepage
*/
app.get('/', function (req, res) {

	var tempList = [
		{temp: "tempasdfsa1", yo: "yo1"},
		{temp: "teasdfsamp1", yo: "yo2"},
		{temp: "temasdfp1", yo: "yo3"}
	]

	var callback = function(db_data) {
		console.log("this is the callback")
		console.log("This is the data:", db_data)

		// var budgetsTableRenderFunc = jade.compileFile('./views/budgetsTable.jade', {data: db_data})
		//
		// var budgetsTableHtml = budgetsTableRenderFunc({data: db_data})
		res.render('index', {data: db_data})

		//res.render('index', {data: db_data})
	}

	db.selectBudgets(callback)
});

function test() {
	console.log("promise")
	return
}

/**
* Get info for specific budget
*/
app.get('/budgetTransactions', function (req, res) {
		//res.send('This request will get the information for a specific budget')
		console.log(req.query)

		var callback = function(db_data) {
			console.log("this is the callback")
			console.log("This is the data:", db_data)
			res.render('budgetTransactions', {data: db_data})
		}

		db.selectBudgetTransactions(req.query.budgetName, callback)

		// Might need this
		//res.end()
});

/**
* Create a new budget
*/
app.post('/createBudget', function (req, res) {
	console.log(req.body)
  //res.send('This is the post to create a new budget\n')

	var callback = function(db_data) {
		console.log("create budget callback data:", db_data)
		res.render('budgetsTable', {data: db_data})
	}

	db.insertBudget(req.body, callback)
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
