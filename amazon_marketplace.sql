-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: amazon_marketplace
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer_account`
--

DROP TABLE IF EXISTS `customer_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_account` (
  `customer_id` varchar(5) NOT NULL,
  `email` varchar(25) NOT NULL,
  `name` varchar(25) NOT NULL,
  `passwd` varchar(12) NOT NULL,
  `address` varchar(30) NOT NULL,
  `credit_card_num` decimal(16,0) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `passwd` (`passwd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_account`
--

LOCK TABLES `customer_account` WRITE;
/*!40000 ALTER TABLE `customer_account` DISABLE KEYS */;
INSERT INTO `customer_account` VALUES ('00001','myemail@gmail.com','name1','00001pwd','1234 st lane',1234567890123456),('00002','myemail00002@gmail.com','name2','00002pwd','8888 new address lane',2438475980294876),('00003','myemail00003@gmail.com','name3','00003pwd','0006 street circle',8888888888888888),('00004','myemail00004@gmail.com','name4','00004pwd','0006 street circle',7777777777777777),('00005','myemail00005@gmail.com','name5','00005pwd','0006 street circle',1111111111111111),('00006','myemail00006@gmail.com','name6','00006pwd','012 road way',5555555555555555);
/*!40000 ALTER TABLE `customer_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `customer_public_info`
--

DROP TABLE IF EXISTS `customer_public_info`;
/*!50001 DROP VIEW IF EXISTS `customer_public_info`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `customer_public_info` AS SELECT 
 1 AS `customer_id`,
 1 AS `email`,
 1 AS `name`,
 1 AS `address`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` varchar(5) NOT NULL,
  `name` varchar(15) NOT NULL,
  `seller_id` varchar(5) DEFAULT NULL,
  `price` decimal(8,2) NOT NULL,
  `rating` decimal(1,0) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `seller_id` (`seller_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `seller_account` (`seller_id`) ON DELETE CASCADE,
  CONSTRAINT `product_chk_1` CHECK ((`price` > 0)),
  CONSTRAINT `product_chk_2` CHECK (((`rating` > 0) and (`rating` <= 5)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('00001','product1','00001',10.99,1),('00002','product2','00002',6.99,4),('00003','product3','00003',6.99,4),('00004','product4','00003',7.50,3),('00005','product5','00006',100.00,2),('00006','product6','00005',45.89,5),('00007','NEW PRODUCT','00005',50.00,5);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller_account`
--

DROP TABLE IF EXISTS `seller_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller_account` (
  `seller_id` varchar(5) NOT NULL,
  `email` varchar(25) NOT NULL,
  `name` varchar(25) NOT NULL,
  `passwd` varchar(12) NOT NULL,
  `address` varchar(30) NOT NULL,
  `account_number` decimal(12,0) NOT NULL,
  `routing_number` decimal(9,0) NOT NULL,
  PRIMARY KEY (`seller_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `passwd` (`passwd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller_account`
--

LOCK TABLES `seller_account` WRITE;
/*!40000 ALTER TABLE `seller_account` DISABLE KEYS */;
INSERT INTO `seller_account` VALUES ('00001','myemail00001@gmail.com','name1','00001pwd','0006 street circle',888888888888,111111111),('00002','myemail00002@gmail.com','name2','00002pwd','00021 st rd',333333333333,222222222),('00003','myemail00003@gmail.com','name3','00003pwd','00043 st cir',777777777777,333333333),('00004','myemail00004@gmail.com','name4','00004pwd','2121 lane park',434343434343,222222222),('00005','myemail00005@gmail.com','name5','00005pwd','4242 circle rd',212121212121,111111111),('00006','myemail00006@gmail.com','name6','00006pwd','5555 apple drive',444444444444,555555555);
/*!40000 ALTER TABLE `seller_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_cart`
--

DROP TABLE IF EXISTS `shopping_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_cart` (
  `customer_id` varchar(5) NOT NULL,
  `product_id` varchar(5) NOT NULL,
  `num_of_prod_in_cart` decimal(3,0) DEFAULT NULL,
  PRIMARY KEY (`customer_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `shopping_cart_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer_account` (`customer_id`) ON DELETE CASCADE,
  CONSTRAINT `shopping_cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE,
  CONSTRAINT `shopping_cart_chk_1` CHECK ((`num_of_prod_in_cart` <= 999))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart`
--

LOCK TABLES `shopping_cart` WRITE;
/*!40000 ALTER TABLE `shopping_cart` DISABLE KEYS */;
INSERT INTO `shopping_cart` VALUES ('00001','00003',5),('00001','00004',2),('00003','00003',30),('00004','00004',8),('00004','00006',999),('00005','00006',7);
/*!40000 ALTER TABLE `shopping_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `customer_public_info`
--

/*!50001 DROP VIEW IF EXISTS `customer_public_info`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `customer_public_info` AS select `customer_account`.`customer_id` AS `customer_id`,`customer_account`.`email` AS `email`,`customer_account`.`name` AS `name`,`customer_account`.`address` AS `address` from `customer_account` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-12 17:44:56
