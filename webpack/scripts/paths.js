/**
 * Author: Moki
 * Date: 2022-09-23
 * FileName: 文件路径
 **/
const paths = require("path");

// 根目录
const rootPath = paths.join(__dirname, '../..');

// src目录
const srcPath = paths.join(rootPath, './src');
// 临时文件
const temporaryPath = paths.join(rootPath, './config/temporary');


module.exports = {
    rootPath,
    srcPath,
    temporaryPath,
};
