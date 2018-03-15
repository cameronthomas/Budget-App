
/**
* Budgets Table
*/
-- Drop tables if exist
DROP TABLE transactions;
DROP TABLE budgets;

-- Create new table
CREATE TABLE BUDGETS(
   ID SERIAL PRIMARY KEY,
   BUDGET_NAME TEXT NOT NULL,
   BUDGET_AMOUNT MONEY NOT NULL
);

-- Display all tables
\dt;

-- Insert into new table
INSERT INTO budgets (budget_name, budget_amount)
VALUES ('Engineering', 30000, );

INSERT INTO budgets (budget_name, budget_amount)
VALUES ('Sales', 500); 

-- Display values in new table
SELECT * FROM budgets;


/**
* Transactions table
*/

CREATE TABLE TRANSACTIONS(
   ID SERIAL PRIMARY KEY,
   MERCHANT_NAME TEXT NOT NULL,
   PURCHASE_AMOUNT MONEY NOT NULL,
   CATEGORY INT REFERENCES budgets(ID),
   NOTES TEXT
);

-- INSERT into new table
INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, CATEGORY, NOTES)
VALUES ('Merchant 1', 20, 1, 'these are the notes');

-- INSERT into new table
INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, CATEGORY, NOTES)
VALUES ('Merchant 2', 220, 1, 'these are the notes');

INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, CATEGORY, NOTES)
VALUES ('Merchant 2', 220, 1, 'these are the notes');

INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, CATEGORY, NOTES)
VALUES ('Merchant 2', 220, 1, 'these are the notes');

INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, CATEGORY, NOTES)
VALUES ('Merchant 2', 220, 1, 'these are the notes');

INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, CATEGORY, NOTES)
VALUES ('Merchant 2', 220, 1, 'these are the notes');

-- Display new table
SELECT * from transactions
WHERE CATEGORY = 1;
