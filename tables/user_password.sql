CREATE TABLE tbl_user_password (
  user_id INT NOT NULL,
  password_hash VARCHAR(255),
  PRIMARY KEY (user_id)
);