const http = require("http");

// //Get
// const server = http.createServer((req, res) => {
//   console.log(`method:${req.method}`); //GET
//   const url = req.url;
//   console.log(`url:${url}`);

//   const myURL = new URL("https://example.org/?abc=123");
//   // const myURL = new URL(url);
//   console.log(myURL.searchParams.get("abc"));

//   res.end("<h1>Hello,Syh</h1>");
// });

// const url = req.url;
// req.path = url.split("?")[0];
// // 解析query
// req.query = querystring.parse(url.split("?")[1]);

//POST
const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    //数据格式--josn
    console.log(`req content-type:${req.headers["content-type"]}`);
    //接收数据
    let postData = "";
    req.on("data", (chunk) => {
      console.log(chunk); //<Buffer
      postData += chunk.toString();
    });

    req.on("end", () => {
      console.log(`postData:${postData}`);
      res.end("post data");
    });
  }
});

server.listen(3000);
console.log("lister:3000-----------");
