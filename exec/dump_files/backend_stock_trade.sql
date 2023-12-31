-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: j9a308.p.ssafy.io    Database: backend
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `stock_trade`
--

DROP TABLE IF EXISTS `stock_trade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_trade` (
  `trade_no` int NOT NULL AUTO_INCREMENT,
  `trade_count` int NOT NULL,
  `trade_price` int NOT NULL,
  `trade_time` decimal(19,2) NOT NULL,
  `stock_no` int NOT NULL,
  `user_no` int NOT NULL,
  PRIMARY KEY (`trade_no`),
  KEY `FK8fpb7weamjdn9mcybo0qbvy38` (`user_no`),
  KEY `FKgs1uwu816wgbuvgqbfapph3tk` (`stock_no`),
  CONSTRAINT `FK8fpb7weamjdn9mcybo0qbvy38` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE,
  CONSTRAINT `FKgs1uwu816wgbuvgqbfapph3tk` FOREIGN KEY (`stock_no`) REFERENCES `stock_event` (`stock_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_trade`
--

LOCK TABLES `stock_trade` WRITE;
/*!40000 ALTER TABLE `stock_trade` DISABLE KEYS */;
INSERT INTO `stock_trade` VALUES (141,9,54500,1695701250937.00,4,55),(142,23,5100,1695701411898.00,1,55),(143,9,-56900,1695702447043.00,4,55),(144,84,5200,1695702519380.00,1,55),(145,16,5200,1695702641220.00,1,56),(146,3,56600,1695702644890.00,4,55),(147,1,56600,1695702649014.00,4,55),(148,107,-5300,1695702764321.00,1,55),(149,6,56000,1695702782537.00,4,55),(150,2,84600,1695704936610.00,3,55),(151,26,5100,1695704948085.00,1,55),(152,6,5100,1695704951443.00,1,55),(153,3,70200,1695704955250.00,2,65),(154,1,29400,1695704961150.00,5,65),(155,50,5100,1695704966438.00,1,65),(156,9,54700,1695705075826.00,4,70),(157,3,71200,1695705098041.00,2,75),(158,3,86300,1695705103295.00,3,75),(159,10,-58400,1695708892530.00,4,55),(160,2,77300,1695709760167.00,2,54),(161,3,-7480,1695712092129.00,2,65),(162,32,-470,1695715994980.00,1,55),(163,2,-7530,1695716002475.00,3,55),(164,110,3130,1695716649489.00,5,55),(165,60,5740,1695716675532.00,4,55),(166,937,480,1695718365216.00,1,61),(167,937,-480,1695718398209.00,1,61),(168,19,7800,1695775889623.00,3,54),(169,14,5300,1695776051815.00,4,54),(170,2,-5850,1695776075401.00,2,54),(171,229,400,1695786759569.00,1,54),(172,2,410,1695787619081.00,1,77);
/*!40000 ALTER TABLE `stock_trade` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-04  9:20:33
