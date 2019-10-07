CREATE TABLE tbl_user_transaction (
  txn_id INT NOT NULL,
  beneficiary_id INT NOT NULL,
  creditor_id INT NOT NULL,
  PRIMARY KEY (txn_id),
  FOREIGN KEY (txn_id) REFERENCES tbl_transaction(txn_id),
  FOREIGN KEY (beneficiary_id) REFERENCES tbl_user(user_id),
  FOREIGN KEY (creditor_id) REFERENCES tbl_user(user_id),
);