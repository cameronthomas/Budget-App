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
  insertBudget: function (newBudget, callback) {
    console.log("Insert budget")
      const text = "INSERT INTO budgets (BUDGET_NAME, BUDGET_AMOUNT)"
      + "VALUES ($1, $2)"
      const values = [newBudget.budgetName, newBudget.budgetAmount]
      console.log("value:", values)

      // // callback
      // client.query(query, values, (err, res) => {
      //   if (err) {
      //     console.log(err.stack)
      //   } else {
      //     console.log(res.rows)
      //   }
      // })

      // client.query(text, values)
      // .then(res => {
      //   callback(res.rows)
      // })
      // .catch(e => console.error(e.stack))

      client.query(text, values)
      .then(res => {
        client.query("SELECT * FROM budgets")
        .then(res => {
          callback(res.rows)
        })
        .catch(e => console.error(e.stack))
      })
      .catch(e => console.error(e.stack))
  },
  insertTransaction: function () {
    console.log("Insert transaction")
  }
}
