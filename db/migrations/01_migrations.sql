CREATE DATABASE IF NOT EXISTS `nutech_db`;
USE `nutech_db`;

CREATE TABLE IF NOT EXISTS `banners` (
  `idBanner` int NOT NULL AUTO_INCREMENT,
  `banner_name` varchar(255) NOT NULL,
  `banner_image` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`idBanner`)
);

CREATE TABLE IF NOT EXISTS `services` (
  `idService` int NOT NULL AUTO_INCREMENT,
  `service_code` varchar(255) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `service_icon` varchar(255) NOT NULL,
  `service_tariff` int NOT NULL,
  PRIMARY KEY (`idService`)
);

CREATE TABLE IF NOT EXISTS `users` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `profile_image` varchar(255) DEFAULT NULL,
  `balance` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`idUser`)
);

CREATE TABLE IF NOT EXISTS `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUser` int NOT NULL,
  `transaction_type` enum('PAYMENT','TOPUP') NOT NULL,
  `amount` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `payments` (
  `idPayment` int NOT NULL AUTO_INCREMENT,
  `idTransaction` int NOT NULL,
  `amount` int NOT NULL,
  `topupStatus` enum('SUCCESS','FAILED') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `invoice_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `service_name` varchar(255) NOT NULL,
  PRIMARY KEY (`idPayment`),
  KEY `idTransaction` (`idTransaction`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`idTransaction`) REFERENCES `transactions` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);



CREATE TABLE IF NOT EXISTS `topup` (
  `idTopUp` int NOT NULL AUTO_INCREMENT,
  `idTransaction` int NOT NULL,
  `amount` int NOT NULL,
  `topupStatus` enum('SUCCESS','FAILED') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `invoice_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`idTopUp`),
  KEY `idTransaction` (`idTransaction`),
  CONSTRAINT `topup_ibfk_1` FOREIGN KEY (`idTransaction`) REFERENCES `transactions` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);



