CREATE TABLE   IF NOT EXISTS  `jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `zwmc` varchar(255) DEFAULT NULL,
  `gsmc` varchar(255) DEFAULT NULL,
  `zwyx` varchar(255) DEFAULT NULL,
  `gzdd` varchar(255) DEFAULT NULL,
  `gxsj` varchar(255) DEFAULT NULL,
  `details` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
