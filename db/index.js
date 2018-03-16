var ip = require('ip')
const { Client } = require('pg')
const client = new Client({
  host: ip.address() == "159.65.75.194" ? "159.65.75.194" : "localhost",
  port: 5432,
  user: 'cameronthomas',
  password: 'password',
	database: 'budgetapp'
})

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

module.exports = {
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
  selectBudgetTransactions: function (budgetName) {
    console.log("Select transactions")

      const query = {
        // give the query a unique name
        name: 'fetch-transactions',
        text: 'SELECT * FROM transactions WHERE BUDGET_NAME = $1',
        values: [budgetName]
      }

      // callback
      client.query(query, (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log(res.rows)
        }
      })
  },
  insertBudget: function () {
    console.log("Insert budget")
      // const query = "INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, CATEGORY, NOTES)"
      // + "VALUES ($1, $2, $3, $4) RETURNING *"
      // const values = ['Merchaasdfsdfnt 2', 22330, 1, 'these are the notes']
      //
      // // callback
      // client.query(query, values, (err, res) => {
      //   if (err) {
      //     console.log(err.stack)
      //   } else {
      //     console.log(res.rows)
      //   }
      // })
  },
  insertTransaction: function () {
    console.log("Insert transaction")
  }
}
