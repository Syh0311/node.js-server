const execSql = require("../db/mysql");

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `; //where 1=1 是为了加让后边能加上
  if (author) {
    sql += `and author=${author} `;
  }
  sql = keyword ? (sql += `and keyword=${keyword} `) : sql;
  console.log(sql);
  return execSql(sql); //promise
};

const getDetail = (id = 1) => {
  let sql = `select * from blogs where id =${id}`;
  return execSql(sql);
};

const newBlog = (blogData = {}) => {
  const { title, content, author } = blogData;

  const sql = `insert into blogs (title,content,author,createtime) values ('${title}','${content}','${author}',${Date.now()})`;
  //${title}外得加引号，不加可体验到catch效果！

  return execSql(sql);
};

const updateBlog = (blogData, id = 4) => {
  console.log(id, blogData);
  const { title, content } = blogData;
  let sql = "";
  if (title && content) {
    sql = `update blogs set title='${title}',content='${content}' where id='${id}'`;
  } else if (title) {
    sql = `update blogs set title='${title}' where id='${id}'`;
  } else {
    sql = `update blogs set content='${content}' where id='${id}'`;
  }
  return execSql(sql);
};

const deleteBlog = (author = "syh", id = 5) => {
  // 加author是为了保证这个人只能删自己的，避免误操作
  author = "syh";
  const sql = `delete from blogs where id=${id} and author='${author}'`;
  // const sql = `update blogs set state=0 where id='${id} and author='${author}'`;

  return execSql(sql);
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
};
