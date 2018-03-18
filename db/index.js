const systemConfig = require('../js/systemConfig')
const { Client } = require('pg')

// Database connection config
const client = new Client({
  host: systemConfig.ip,
  port: systemConfig.dbPort,
  user: systemConfig.dbUser,
  password: systemConfig.dbPassword,
	database: systemConfig.dbName
})

// Connect to database
client.connect()
.then(res => {
  console.log("Database connected")
})
.catch(e => console.error('Database connection error:', e.stack))

module.exports = {
  /**
  * Select all budgets
  */
  selectBudgets: function(callback) {
    console.log("Select budgets")
    const queryText = "SELECT * FROM BUDGETS"

    // Run question
    client.query(queryText)
    .then(res => {
      callback(res.rows)
    })
    .catch(e => console.error(e.stack))
  },

  /**
  * Select budget transactions
  */
  selectBudgetTransactions: function (budgetName, callback) {
    console.log("Select transactions")
    const queryText = {
      name: 'fetch-transactions',
      text: 'SELECT * FROM transactions WHERE BUDGET_NAME = $1',
      values: [budgetName]
    }

    // Run query
    client.query(queryText)
    .then(res => {
      callback(res.rows)
    })
    .catch(e => console.error(e.stack))
  },

  /**
  * Insert Budget
  */
  insertBudget: function (newBudget, callback) {
    console.log("Insert budget")

    // Create insert query
    const queryText = "INSERT INTO budgets (BUDGET_NAME, BUDGET_AMOUNT, "
    + "BUDGET_AMOUNT_USED, BUDGET_AMOUNT_LEFT)"
    + "VALUES ($1, $2, 0, $2) RETURNING *"
    const values = [newBudget.budgetName, newBudget.budgetAmount]

    client.query(queryText, values)
    .then(res => {
      callback(res.rows)
    })
    .catch(e => console.error(e.stack))
  },

  /**
  * Insert transaction
  */
  insertTransaction: function (data, callback) {
    console.log("Insert transaction")

    const insertTransactionQueryText = "INSERT INTO transactions"
    +"(MERCHANT_NAME, PURCHASE_AMOUNT, BUDGET_NAME, NOTES)"
    + "VALUES ($1, $2, $3, $4);"
    const insertTransactionQueryValues = [data.merchant, data.purchaseAmount, data.budgetName, data.notes]

    const updateBudgetQuery = {
      text : "UPDATE BUDGETS "
      +"SET budget_amount_used = budget_amount_used + $1, "
      +"budget_amount_left = budget_amount_left - $1"
      +"WHERE budget_name = $2 RETURNING *",
      values : [data.purchaseAmount, data.budgetName]
    }

    // Run query
    client.query(insertTransactionQueryText, insertTransactionQueryValues)
    .then(res => {
      client.query(updateBudgetQuery)
      .then(res => {
        callback(res.rows)
      })
      .catch(e => console.error(e.stack))
    })
    .catch(e => console.error(e.stack))
  }
}
