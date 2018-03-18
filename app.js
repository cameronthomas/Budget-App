const express = require('express');
const app = express();
const systemConfig = require('./js/systemConfig')
const port = systemConfig.port
const db = require('./db/index')
const reportGenerator = require('./js/generateReport')
const bodyParser = require('body-parser')

// Configure server
app.set('view engine', 'jade')
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/**
 * Homepage
 */
app.get('/', function(req, res) {
  const callback = function(db_data) {
    res.render('index', {
      data: db_data
    })
  }

  db.selectBudgets(callback)
});

/**
 * Get info for specific budget
 */
app.get('/budgetTransactions', function(req, res) {
  const callback = function(db_data) {
    res.render('budgetTransactions', {
      data: db_data
    })
  }

  db.selectBudgetTransactions(req.query.budgetName, callback)
});

/**
 * Create a new budget
 */
app.post('/createBudget', function(req, res) {
  const callback = function(db_data) {
    res.render('budgetsTable', {
      data: db_data
    })
  }

  db.insertBudget(req.body, callback)
})

/**
 * Create a new transaction
 */
app.post('/createTransaction', function(req, res) {
  const callback = function(db_data) {
    res.send(db_data)
  }

  db.insertTransaction(req.body, callback)
})

/**
 * Handle 404
 */
app.use(function(req, res, next) {
  res.status(404).send("Oops, we can't find what you are looking for!")
})

/**
 * Start server
 */
app.listen(port, function() {
  console.log('Budget app listening on port ' + port + '!')
  //getExpenseReport()
})


function getExpenseReport() {
  const callback = function(db_data) {
    reportGenerator.expenseReport(db_data)
  }

  db.selectBudgetTransactions('Engineering', callback)
}
