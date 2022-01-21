const execSql = require("../db/mysql");

//异步
const loginCheck = (name = "syh", psw = "000") => {
  const sql = `select * from users where username='${name}' and password='${psw}'`;
  return execSql(sql).then((rows) => {
    if (!rows[0]) {
      return false;
    } else {
      return rows[0];
    }
  });
};

// //async同步版--我就想先拿到数据再执行下边的
// const loginCheck = async (name, psw) => {
//   const sql = `select * from users where username='${name}' and password='${psw}'`;
//   const rows = await execSql(sql);
//   console.log(rows);
//   if (!rows[0]) {
//     return false;
//   } else {
//     return rows;
//   }
// };

module.exports = {
  loginCheck,
};
