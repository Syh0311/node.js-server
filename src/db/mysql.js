const mysql = require("mysql2");
const MYSQL_CONF = require("../confg/db");

//1.创建连接对象
const con = mysql.createConnection(MYSQL_CONF);

//2.开始连接
con.connect();
// con.connect(callback)

//3.统一执行sql的函数：把具体的操作抽离--
const execSql = (sql) => {
  //读取数据是异步的
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
  return promise;
};

module.exports = execSql;
