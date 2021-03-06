// Sources: https://github.com/brianc/node-postgres
// https://node-postgres.com/
const systemConfig = require('../js/systemConfig')
const { Client } = require('pg')
const camelCase = require('camelcase');

// Database connection config
const client = new Client({
  host: systemConfig.ipAddress,
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
  selectBudgets: function(resolve) {
    console.log("Select budgets")
    let queryText = "SELECT * FROM BUDGETS"

    client.query(queryText)
      .then(res => {
        resolve(res.rows)
      })
      .catch(e => console.error(e.stack))
  },

  /**
   * Select budget transactions
   */
  selectBudgetTransactions: function(budgetName, resolve) {
    console.log("Select transactions")
    let queryText = {
      name: 'fetch-transactions',
      text: 'SELECT * FROM transactions WHERE BUDGET_NAME = $1',
      values: [budgetName]
    }

    client.query(queryText)
      .then(res => {
        resolve(res.rows)
      })
      .catch(e => console.error(e.stack))
  },

  /**
   * Insert Budget
   */
  insertBudget: function(newBudget, resolve) {
    console.log("Insert budget")
    let queryText = "INSERT INTO budgets (BUDGET_NAME, BUDGET_NAME_HTML_ID, BUDGET_AMOUNT, " +
      "BUDGET_AMOUNT_USED, BUDGET_AMOUNT_LEFT)" +
      "VALUES ($1, $2, $3, 0, $3) RETURNING *"
    let values = [newBudget.budgetName, encodeURIComponent(newBudget.budgetName), newBudget.budgetAmount]

    client.query(queryText, values)
      .then(res => {
        resolve(res.rows)
      })
      .catch(e => console.error(e.stack))
  },

  /**
   * Insert transaction
   */
  insertTransaction: function(data, resolve) {
    console.log("Insert transaction")
    let insertTransactionQueryText = "INSERT INTO transactions" +
      "(MERCHANT_NAME, PURCHASE_AMOUNT, BUDGET_NAME, NOTES)" +
      "VALUES ($1, $2, $3, $4);"
    let insertTransactionQueryValues = [data.merchant, data.purchaseAmount, data.budgetName, data.notes]

    let updateBudgetQuery = {
      text: "UPDATE BUDGETS " +
        "SET budget_amount_used = budget_amount_used + $1, " +
        "budget_amount_left = budget_amount_left - $1" +
        "WHERE budget_name = $2 RETURNING *",
      values: [data.purchaseAmount, data.budgetName]
    }

    client.query(insertTransactionQueryText, insertTransactionQueryValues)
      .then(res => {
        // Run second query to update budgets table
        client.query(updateBudgetQuery)
          .then(res => {
            resolve(res.rows)
          })
          .catch(e => console.error(e.stack))
      })
      .catch(e => console.error(e.stack))
  }
}
