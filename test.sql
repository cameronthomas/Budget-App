/**
* Budgets Table
*/
-- Drop tables if exist
DROP TABLE transactions;
DROP TABLE budgets;

-- Create new table
CREATE TABLE BUDGETS(
--   ID SERIAL PRIMARY KEY,
   BUDGET_NAME TEXT PRIMARY KEY NOT NULL,
   BUDGET_AMOUNT MONEY NOT NULL
);

-- Display all tables
\dt;

-- Insert into new table
INSERT INTO budgets (budget_name, budget_amount)
VALUES ('Engineering', 30000);

INSERT INTO budgets (budget_name, budget_amount)
VALUES ('Sales', 500); 

INSERT INTO budgets (budget_name, budget_amount)
VALUES ('HR', 500);

-- Display values in new table
SELECT * FROM budgets;


/**
* Transactions table
*/

CREATE TABLE TRANSACTIONS(
   ID SERIAL PRIMARY KEY,
   MERCHANT_NAME TEXT NOT NULL,
   PURCHASE_AMOUNT MONEY NOT NULL,
   BUDGET_NAME TEXT REFERENCES budgets(budget_name),
   NOTES TEXT
);

-- INSERT into new table
INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, BUDGET_NAME, NOTES)
VALUES ('Merchant 1', 234, 'Engineering', 'these are the notes');

INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, BUDGET_NAME, NOTES)
VALUES ('Merchant 1', 234, 'Engineering', 'these are the notes');

INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, BUDGET_NAME, NOTES)
VALUES ('Merchant 1', 234, 'Engineering', 'these are the notes');

INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, BUDGET_NAME, NOTES)
VALUES ('Merchant 1', 234, 'HR', 'these are the notes');

INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, BUDGET_NAME, NOTES)
VALUES ('Merchant 1', 234, 'HR', 'these are the notes');

INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, BUDGET_NAME, NOTES)
VALUES ('Merchant 1', 234, 'Sales', 'these are the notes');

INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, BUDGET_NAME, NOTES)
VALUES ('Merchant 1', 234, 'Sales', 'these are the notes');

INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, BUDGET_NAME, NOTES)
VALUES ('Merchant 1', 234, 'Sales', 'these are the notes');

INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, BUDGET_NAME, NOTES)
VALUES ('Merchant 1', 234, 'Sales', 'these are the notes');

INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, BUDGET_NAME, NOTES)
VALUES ('Merchant 1', 234, 'Sales', 'these are the notes');

INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, BUDGET_NAME, NOTES)
VALUES ('Merchant 1', 234, 'Sales', 'these are the notes');

INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, BUDGET_NAME, NOTES)
VALUES ('Merchant 1', 234, 'Sales', 'these are the notes');

INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, BUDGET_NAME, NOTES)
VALUES ('Merchant 1', 234, 'Sales', 'these are the notasfsadk;fjks;dkfjs;dkf;sdfj;sdjf;sfjksdklsdfklkljsdfke
asdlfkjs;adjf;lsdjfsdfljsjdkfsddddddddddddddal;ksjdf;asdjflsadf
asl;dkfj;asldjf;lasjdfjksaldfjsadfsldfjs
askldfjlsaf
askdf;s');

INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, BUDGET_NAME, NOTES)
VALUES ('Merchant 1', 234, 'Sales', 'these are the notes');

INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, BUDGET_NAME, NOTES)
VALUES ('Merchant 1', 234, 'Sales', 'these are the notes');

INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, BUDGET_NAME, NOTES)
VALUES ('Merchant 1', 234, 'Sales', 'these are the notes');

INSERT INTO transactions (MERCHANT_NAME, PURCHASE_AMOUNT, BUDGET_NAME, NOTES)
VALUES ('Merchant 1', 234, 'Sales', 'these are the notes');







-- Display new table
SELECT * from transactions;


