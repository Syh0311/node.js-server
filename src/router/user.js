const { loginCheck } = require("../dataController/userMethods");
const { SuccessModle, ErrorModle } = require("../modle/resModle");

const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};

const hanldleUserRouter = (req, res) => {
  const { method, url } = req;
  const [path, params] = url.split("?");

  if (method === "POST" && path === "/api/user/login") {
    // const { username, password } = req.body;
    // console.log([username, password]);
    return loginCheck().then((userInfo) => {
      if (userInfo) {
        console.log("登陆成功");
        res.setHeader("Set-Cookie", `username=${userInfo.username}; path=/; httpOnly; expires=${getCookieExpires()}`);
        //path=/---cookie作用到根路径上
        //httpOnly--只允许后台修改
        //expires---设置expire时间
        return new SuccessModle("登陆成功!");
      }
      return new ErrorModle("登陆失败");
    });
  }

  //啥都没
  return;
};

module.exports = hanldleUserRouter;
