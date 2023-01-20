CREATE DATABASE IF NOT EXISTS `api_users`;
use `api_users`;
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NULL,
    password VARCHAR(255) NULL,
    role INT(10) NOT NULL,
    email VARCHAR(255) NULL,
    adresse VARCHAR(255) NULL,
    money INT(10) NULL,
    timestamp TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NULL,
    price INT(10) NULL,
    description VARCHAR(255) NULL,
    userID INT(10) NULL,
    image VARCHAR(255) NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

INSERT INTO Users (username, password, role, email, adresse, money) VALUES ('admin', 'admin', 1, 'admin@gmail.com', '12 rue mathis', 0);
INSERT INTO products (name, price, description, userID, image) VALUES ('Product1', 10, 'Un produit 1 qui est bon pour la santé', 1, 'chat1.jfif');
INSERT INTO products (name, price, description, userID, image) VALUES ('Product2', 20, 'Un produit 2 qui est mauvais pour le corps', 1, 'chat2.jpg');

-- SELECT * FROM products WHERE userID = 1;