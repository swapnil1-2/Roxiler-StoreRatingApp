-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: roxiler_db
-- ------------------------------------------------------
-- Server version 8.0.43

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
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `storeId` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `storeId` (`storeId`),
  CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`storeId`) REFERENCES `stores` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ratings_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (1,1,1,4);
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(400) DEFAULT NULL,
  `ownerId` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES 
(1,'ABC store','abcsupport@gmail.com','india','10'),
(2,'Store 2','store2@gmail.com','nagpur, india','11');
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(400) NOT NULL,
  `role` enum('admin','user','storeOwner') DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES 
(1,'kunal Gawande','kunalgawande@gmail.com','$2b$10$iH40nrpx1hN4pi0aIE8nzuBilEiSGq2J5t14VTq7zkf4F8dsiq1uG','Shri Sai Building, in front of bachat chavan, near old polytechnic college
pushkarna nager, juna dhamangaon, Dhamangaon Rly, Dist. Amravati, Maharashtra','user'),
(4,'Asmit gawande','asmitgawande137@gmail.com','$2b$10$6pNrJKeRjhNHwS/OAv/EnuKcFg8bSp0tcfjXrY0r8LOVsWnqMBni6','Shri Sai Building, in front of bachat chavan, near old polytechnic college','user'),
(5,'kunal Gawande','kunalgawande137@gmail.com','$2b$10$jx9ZrQ0nI1J89YcmbQZxYuYC.9ArIp0sau2PvmJEC5vCGCZz6iHTa','Shri Sai Building, in front of bachat chavan, near old polytechnic college','user'),
(6,'Asmit Gawande','asmitgawande@gmail.com','$2b$10$oPjdsurcCOveHVdD9MXS2u6M4s2hY5qX8I3m21sybDRWVTNMt4WGe','Shri Sai Building, in front of bachat chavan, near old polytechnic college','user'),
(7,'Jonathan Smith','test@example.com','$2b$10$qAUCSRjxhC/QArZ5hTLjLOvb0sVuG9ubUdRcxbKChPiSBVVvsTz.m','123 React Street, UI City, India','user'),
(8,'system admin','systemadmin@gmail.com','$2b$10$nz1f6XRrvXk3XjixQHCByugLf9WaPrfFFlwJ/iF1P74zjZw1QO2Pm','63 Locust Lane Mableton, GA 30126','admin'),
(9,'vivky singh','singhvivky@gmail.com','$2b$10$OMJimg2z6IgCZe4eOPWODuzcue9DPBOTtC7zBTXvPSC7ih/rDDg2e','punjab, india','user'),
(10,'store owner1','storeowner@gmail.com','$2b$10$idKYn.7dQzRXtrHftnZnye5/S02TQPbbhe5/k4O9F/LXZr.18E.5.','Shri Sai Building, in front of bachat chavan, near old polytechnic college','storeOwner'),
(11,'store owner 2','storeowner2@gmail.com','$2b$10$YDAaBfIT4U5MHKSpArRz2.5MmTHtJ.cI3n7EG5AbtpWCtGfPVl2We','nagpur, india','storeOwner');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-15  0:58:47
