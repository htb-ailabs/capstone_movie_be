
CREATE DATABASE IF NOT EXISTS `node46_capstone_movie` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `node46_capstone_movie`;

CREATE TABLE IF NOT EXISTS `NguoiDung` (
  `tai_khoan` int NOT NULL AUTO_INCREMENT,
  `ho_ten` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `so_dt` varchar(255) NOT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `loai_nguoi_dung` varchar(255) NOT NULL,   
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`tai_khoan`)  
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `HeThongRap` (
  `ma_he_thong_rap` int NOT NULL AUTO_INCREMENT,
  `ten_he_thong_rap` varchar(255) NOT NULL,
  `logo` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ma_he_thong_rap`)  
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `CumRap` (
  `ma_cum_rap` int NOT NULL AUTO_INCREMENT,
  `ten_cum_rap` varchar(255) NOT NULL,
  `dia_chi` varchar(255) NOT NULL, 
  `ma_he_thong_rap` int DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ma_cum_rap`),
  KEY `ma_he_thong_rap` (`ma_he_thong_rap`), 
  CONSTRAINT `cumrap_hethongrap` FOREIGN KEY (`ma_he_thong_rap`) REFERENCES `HeThongRap` (`ma_he_thong_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `RapPhim` (
  `ma_rap` int NOT NULL AUTO_INCREMENT,
  `ten_rap` varchar(255) NOT NULL,
  `ma_cum_rap` int DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ma_rap`),
  KEY `ma_cum_rap` (`ma_cum_rap`), 
  CONSTRAINT `rapphim_cumrap` FOREIGN KEY (`ma_cum_rap`) REFERENCES `CumRap` (`ma_cum_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `Ghe` (
  `ma_ghe` int NOT NULL AUTO_INCREMENT,
  `ten_ghe` varchar(255) NOT NULL,
   `loai_ghe` varchar(255) NOT NULL,
  `ma_rap` int DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ma_ghe`),
  KEY `ma_rap` (`ma_rap`), 
  CONSTRAINT `ghe_rapphim` FOREIGN KEY (`ma_rap`) REFERENCES `RapPhim` (`ma_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `Phim` (
  `ma_phim` int NOT NULL AUTO_INCREMENT,
  `ten_phim` varchar(255) NOT NULL,
   `trailer` varchar(255) DEFAULT NULL,
   `hinh_anh` varchar(255) DEFAULT NULL,
   `mo_ta` varchar(255) DEFAULT NULL,
   `ngay_khoi_chieu` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   `danh_gia` int DEFAULT NULL,
  `hot` boolean DEFAULT NULL,
  `dang_chieu` boolean DEFAULT NULL,
  `sap_chieu` boolean DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `Banner` (
  `ma_banner` int NOT NULL AUTO_INCREMENT,
  `ma_phim` int DEFAULT NULL,
	`hinh_anh` varchar(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ma_banner`),
  KEY `ma_phim` (`ma_phim`), 
  CONSTRAINT `banner_phim` FOREIGN KEY (`ma_phim`) REFERENCES `Phim` (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `LichChieu` (
  `ma_lich_chieu` int NOT NULL AUTO_INCREMENT,
  `ma_rap` int DEFAULT NULL,
   `ma_phim` int DEFAULT NULL,
	`ngay_gio_chieu` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`gia_ve` int DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ma_lich_chieu`),
  KEY `ma_phim` (`ma_phim`), 
  KEY `ma_rap` (`ma_rap`), 
  CONSTRAINT `lich_phim` FOREIGN KEY (`ma_phim`) REFERENCES `Phim` (`ma_phim`),
  CONSTRAINT `lich_rap` FOREIGN KEY (`ma_rap`) REFERENCES `RapPhim` (`ma_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `DatVe` (
`ma_ve` int NOT NULL AUTO_INCREMENT,
  `tai_khoan` int NOT NULL,
  `ma_lich_chieu` int NOT NULL,
	`ma_ghe` int NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ma_ve`),
  KEY `tai_khoan` (`tai_khoan`), 
  KEY `ma_lich_chieu` (`ma_lich_chieu`),
  KEY `ma_ghe` (`ma_ghe`),
  CONSTRAINT `ve_taikhoan` FOREIGN KEY (`tai_khoan`) REFERENCES `NguoiDung` (`tai_khoan`),
  CONSTRAINT `ve_lich` FOREIGN KEY (`ma_lich_chieu`) REFERENCES `LichChieu` (`ma_lich_chieu`),
  CONSTRAINT `ve_ghe` FOREIGN KEY (`ma_ghe`) REFERENCES `Ghe` (`ma_ghe`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


