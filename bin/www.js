const http = require("http");
const path = require("path");
const PORT = 3000;
const serverHandle = require("../app");
const server = http.createServer(serverHandle);

server.listen(PORT);

//这个只是创建了server，没必要单独放在app.js中，所以抽离出来这部分
// 本来应该在app.js中写：
// const server = http.createServer((req, res) => {})
//现在将createServer这个高阶函数接受的函数封装，在这个地方引入，app.js只负责那个回调函数【serverHandle】
