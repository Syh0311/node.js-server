const { ErrorModle } = require("./src/modle/resModle");
const handleBlogRouter = require("./src/router/blog");
const hanldleUserRouter = require("./src/router/user");

//处理post data--用promise没有返回
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    // console.log(req);
    //1.判断请求方式
    if (req.method !== "POST") {
      resolve({});
      return;
    }
    //2.判断传入数据是否是json格式【"content-type"是小写了！！！】
    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }
    //3.是post且是json
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk;
    });
    req.on("end", () => {
      // console.log(JSON.parse(postData.toString()));
      //3.1 chunk完还是空的
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise;
};

const serverHandle = (req, res) => {
  //1.设置返回 数据格式--josn
  res.setHeader("Content-type", "application/json");

  //处理cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(";").forEach((el) => {
    if (!el) {
      return; //forEach里的return只是这一次循环终止，因为这是个回调函数
    }
    // const [key, value] = el.split("=");
    const arr = el.split("=");
    const key = arr[0].trim();
    const value = arr[1].trim();
    req.cookie[key] = value;
  });
  console.log(req.cookie);

  //最外层--处理post data
  getPostData(req).then((e) => {
    req.body = e;
    //原本在异步函数外

    //2.router
    //2.1处理blog路由
    // const blogData = handleBlogRouter(req, res);
    // if (blogData) {
    //   res.end(JSON.stringify(blogData));
    //   return; //不用再执行下一个了
    // }
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult
        .then((blogData) => {
          res.end(JSON.stringify(blogData));
        })
        .catch((err) => {
          const error = new ErrorModle(err, "error啦！");
          res.end(JSON.stringify(error));
        });
      return;
    }

    //2.2处理user路由
    //async同步版--现在咋处理报错？？
    // const userResult = hanldleUserRouter(req, res); //async同步了下，能直接获取结果
    // if (userResult) {
    //   res.end(JSON.stringify(userResult));
    //   return;
    // }

    //异步回调版
    const userResult = hanldleUserRouter(req, res);
    if (userResult) {
      userResult
        .then((userData) => {
          res.end(JSON.stringify(userData));
        })
        .catch((err) => {
          const result = new ErrorModle(err, "user部分出错~");
          res.end(JSON.stringify(result));
        });
      return;
    }

    //3.未命中路由
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("找不到404！/n！/n！/n");
    res.end();
    // return {};
  });
};

module.exports = serverHandle;
