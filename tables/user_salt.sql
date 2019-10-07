CREATE TABLE tbl_user_salt (
  user_id INT NOT NULL,
  salt VARCHAR(255),
  PRIMARY KEY (user_id)
);