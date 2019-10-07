CREATE TABLE tbl_transaction (
  txn_id INT UNSIGNED NOT NULL AUTO_INCREMENT, 
  txn_name VARCHAR(255) NOT NULL,
  txn_description VARCHAR(255),
  amount DECIMAL(5, 2) NOT NULL,
);