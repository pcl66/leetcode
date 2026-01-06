const fs = require('fs');
const path = require('path');

// 获取当前文件路径
const currentFilePath = path.join(__dirname, '题目列表.js');

// 获取当前日期
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

// 生成新文件路径
const newFilePath = path.join(__dirname, `${formattedDate}.js`);

// 复制文件
fs.copyFile(currentFilePath, newFilePath, (err) => {
  if (err) {
    console.error('文件复制失败:', err);
  } else {
    console.log(`文件已成功复制到: ${newFilePath}`);
  }
});