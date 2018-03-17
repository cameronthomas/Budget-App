var ip = require('ip')
const { Client } = require('pg')

// Database connection config
const client = new Client({
  host: ip.address() == "159.65.75.194" ? "159.65.75.194" : "localhost",
  port: 5432,
  user: 'cameronthomas',
  password: 'password',
	database: 'budgetapp'
})

// Connect to database
client.connect()
.then(res => {
  console.log("connected")
})
.catch(e => console.error('connection error:', e.stack))

module.exports = {
  /**
  * Select all budgets
  */
  selectBudgets: function(callback) {
    console.log("Select budgets")
    const text = "SELECT * FROM BUDGETS"

    // Run question
    client.query(text)
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
    const text = {
      name: 'fetch-transactions',
      text: 'SELECT * FROM transactions WHERE BUDGET_NAME = $1',
      values: [budgetName]
    }

    // Run query
    client.query(text)
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
    const text = "INSERT INTO budgets (BUDGET_NAME, BUDGET_AMOUNT)"
    + "VALUES ($1, $2)"
    const values = [newBudget.budgetName, newBudget.budgetAmount]

    // Inert budget into table
    client.query(text, values)
    .then(res => {
      // Select all budgets after insert of new budget
      client.query("SELECT * FROM budgets")
      .then(res => {
        callback(res.rows)
      })
      .catch(e => console.error(e.stack))
    })
    .catch(e => console.error(e.stack))
  },

  /**
  * Insert transaction
  */
  insertTransaction: function (data) {
    console.log("Insert transaction")
    const text = "INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, BUDGET_NAME, NOTES)"
    + "VALUES ($1, $2, $3, $4)"
    const values = [data.merchant, data.purchaseAmount, data.budgetName, data.notes]

    // Run query
    client.query(text, values)
    .then(res => {
      console.log(res)
    })
    .catch(e => console.error(e.stack))
  }
}
