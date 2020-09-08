/*
 Navicat Premium Data Transfer

 Source Server         : 腾讯
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : cdb-njokm572.bj.tencentcdb.com:10165
 Source Schema         : 200904blog

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : 65001

 Date: 08/09/2020 14:26:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(60) DEFAULT NULL,
  `content` text NOT NULL,
  `ctime` varchar(13) NOT NULL,
  `status` char(1) NOT NULL COMMENT '类型 0 草稿；1发布',
  `html` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog
-- ----------------------------
BEGIN;
INSERT INTO `blog` VALUES (1, '博客的开始', '\n# 一份简单的博客系统\n\n前端：Vue\n\n后端：NodeJs+Expresss+MySql\n\n![image.png](http://itsse.oss-cn-shanghai.aliyuncs.com/files/1599533107582.png)', '1599534111413', '1', '<h1><a id=\"_1\"></a>一份简单的博客系统</h1>\n<p>前端：Vue</p>\n<p>后端：NodeJs+Expresss+MySql</p>\n<p><img src=\"http://itsse.oss-cn-shanghai.aliyuncs.com/files/1599533107582.png\" alt=\"image.png\" /></p>\n');
COMMIT;

-- ----------------------------
-- Table structure for routers
-- ----------------------------
DROP TABLE IF EXISTS `routers`;
CREATE TABLE `routers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `routerName` varchar(10) NOT NULL,
  `routerPath` varchar(255) NOT NULL,
  `canRouter` char(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of routers
-- ----------------------------
BEGIN;
INSERT INTO `routers` VALUES (1, '首页', '/', '1');
INSERT INTO `routers` VALUES (2, '后台', '/back', '1');
COMMIT;

-- ----------------------------
-- Table structure for setting
-- ----------------------------
DROP TABLE IF EXISTS `setting`;
CREATE TABLE `setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `footer` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of setting
-- ----------------------------
BEGIN;
INSERT INTO `setting` VALUES (1, 'WishMeLzzz', '生活其实很有趣', '   <style>\n      .footer {\n        text-align:center;\npadding:20px 0;\n      }\n    </style>\n      <div class=\"footer\">\n        © 2020 WishMeLzzz\n      </div>');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `psd` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'admin', '53fe5cd0617f4331f5c0496cd886a224');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
