const express = require('express');
const app = express();
const systemConfig = require('./js/systemConfig')
const port = systemConfig.port
const db = require('./db/databaseAccess')
const reportGenerator = require('./js/generateReport')
const bodyParser = require('body-parser')
const Promise = require("promise")
const csv = require('csv-express')

// Configure server
app.set('view engine', 'jade')
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/pdf', express.static(__dirname + './js/'));

/**
 * Homepage
 */
app.get('/', function(req, res) {
  new Promise(function(resolve) {
    db.selectBudgets(resolve)
  }).then(function(db_data) {
    res.render('index', {
      data: db_data
    })
  })
});

/**
 * Get transactions for specific budget
 */
app.get('/budgetTransactions', function(req, res) {
  new Promise(function(resolve) {
    db.selectBudgetTransactions(req.query.budgetName, resolve)
  }).then(function(db_data) {
    res.render('budgetTransactions', {
      data: db_data
    })
  })
});

/**
 * Create a new budget
 */
app.post('/createBudget', function(req, res) {
  new Promise(function(resolve) {
    db.insertBudget(req.body, resolve)
  }).then(function(db_data) {
    console.log(db_data)
    res.render('budgetsTable', {
      data: db_data
    })
  })
})

/**
 * Create a new transaction
 */
app.post('/createTransaction', function(req, res) {
  new Promise(function(resolve) {
    db.insertTransaction(req.body, resolve)
  }).then(function(db_data) {
    res.send(db_data)
  })
})

/**
 * Generate PDFs
 */
app.get('/transactionPdf', function(req, res) {
  res.type("application/pdf")
  new Promise(function(resolve) {
    db.selectBudgetTransactions(req.query.budgetName, resolve)
  }).then(function(db_data) {
    reportGenerator.expenseReport(db_data).pipe(res)
    console.log("PDF report generated")
  })
})

/**
 * Generate CSV
 */
app.get('/transactionCsv.csv', function(req, res) {
  res.type('text/csv')
  new Promise(function(resolve) {
    db.selectBudgetTransactions(req.query.budgetName, resolve)
  }).then(function(db_data) {
    if(db_data.length == 0) {
      res.send("No Transactions")
    } else {
      res.csv(reportGenerator.prepareListForCsv(db_data), true)
    }
    console.log("CSV generated")
  })
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
})
