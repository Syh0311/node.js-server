const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require("../dataController/blogData");
const { SuccessModle, ErrorModle } = require("../modle/resModle");

//处理路由与处理数据分离
const handleBlogRouter = (req, res) => {
  const { method, url } = req;
  const [path, params] = url.split("?");
  // console.log(method, url, path);

  //获取博客列表
  if (method === "GET" && path === "/api/blog/list") {
    const author = req.author || "";
    const keyword = req.keyword || "";

    const promise = getList(author, keyword).then((blogList) => {
      // console.log("blogList------------");
      return new SuccessModle(blogList);
    });

    return promise;
  }

  //获取博客详情
  if (method === "GET" && path === "/api/blog/detail") {
    const id = 3; //req.query.id
    return getDetail(id).then((blogDetail) => {
      return new SuccessModle(blogDetail);
    });

    const blogDetail = getDetail();
    return new SuccessModle(blogDetail);
  }

  //新建博客
  if (method === "POST" && path === "/api/blog/new") {
    const newResult = newBlog(req.body);
    return newResult.then((state) => {
      return new SuccessModle(state);
    });
  }

  //更新博客
  if (method === "POST" && path === "/api/blog/update") {
    // const id = url.searchParams.get("id");
    const id = 4;
    return updateBlog(req.body).then((state) => {
      return new SuccessModle(state);
    });
  }

  //删除博客
  if (method === "POST" && path === "/api/blog/del") {
    // const id = params.slice(4);
    const promise = deleteBlog(req.body).then((state) => {
      return new SuccessModle(state);
    });
    return promise;
  }

  //啥都没
  return;
};

module.exports = handleBlogRouter;
