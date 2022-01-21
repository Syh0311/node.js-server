const mysql = require("mysql2");

//1.创建连接对象
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "000000",
  port: "3306",
  database: "myblog",
});

//2.开始连接
con.connect();
// con.connect((err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
// });

//3.执行sql语句
const sql = "update users set password='1000' where username='sy' ";
// const sql = "select * from blogs where author='syh' ";
con.query(sql, (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
});

//4.断开连接-要不进程会一直执行
con.end();
