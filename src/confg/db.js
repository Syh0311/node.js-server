const env = process.env.NODE_ENV; //package.json里

let MYSQL_CONF;

// console.log(env);

if (env === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "000000",
    port: "3306",
    database: "myblog",
  };
}

if (env === "production") {
  //先放这
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "000000",
    port: "3306",
    database: "myblog",
  };
}

module.exports = MYSQL_CONF;
//啥都能写到单独js中导出，对象尤为合适
