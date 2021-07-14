CREATE DATABASE node_mini_sprint;

USE node_mini_sprint;

CREATE TABLE quotes (
  id INT NOT NULL AUTO_INCREMENT,
  quote TINYTEXT,
  PRIMARY KEY (id)
)