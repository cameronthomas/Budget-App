var express = require('express');
var app = express();
var ip = require('ip')
var port = ip.address() == "159.65.75.194" ? 80 : 3000
var db = require('./db/index')
var reportGenerator = require('./js/generateReport')
var promise = require('promise')
var bodyParser = require('body-parser')
var jade = require('jade');

// Configure server
app.set('view engine', 'jade')
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/**
* Homepage
*/
app.get('/', function (req, res) {
	// Call after database call
	const callback = function(db_data) {
		// var budgetsTableRenderFunc = jade.compileFile('./views/budgetsTable.jade', {data: db_data})
		// var budgetsTableHtml = budgetsTableRenderFunc({data: db_data})
		res.render('index', {data: db_data})
	}

	// Dabase call
	db.selectBudgets(callback)
});

/**
* Get info for specific budget
*/
app.get('/budgetTransactions', function (req, res) {
		const callback = function(db_data) {
			res.render('budgetTransactions', {data: db_data})
		}

		db.selectBudgetTransactions(req.query.budgetName, callback)
});

/**
* Create a new budget
*/
app.post('/createBudget', function (req, res) {
	var callback = function(db_data) {
	  res.render('budgetsTable', {
	    data: db_data
	  })
	  console.log(db_data)
	  //res.send(db_data)
	}

	db.insertBudget(req.body, callback)
})

/**
* Create a new transaction
*/
app.post('/createTransaction', function (req, res) {
	var callback = function(db_data) {
		// res.render('budgetsTable', {
	  //   data: db_data
	  // })
		res.send(db_data)
	  console.log(db_data)
	}

	db.insertTransaction(req.body, callback)
})

// Handle 404
app.use(function (req, res, next) {
  res.status(404).send("Oops, we can't find what you are looking for!")
})


/**
* Start server
*/
app.listen(port, function () {
	console.log('Budget app listening on port ' + port + '!')
	getExpenseReport()
})


function getExpenseReport() {
	const callback = function(db_data) {
		reportGenerator.expenseReport(db_data)
	}

	db.selectBudgetTransactions('Engineering', callback)
}
