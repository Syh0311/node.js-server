const fs = require("fs");
const path = require("path");

// //3.最优解--async、await---还没解决

// const getFileContent = (fileName) => {
//   const fullName = path.resolve(__dirname, "files", fileName);
//   fs.readFile(fullName, (err, data) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     // console.log(JSON.parse(data));
//     return JSON.parse(data);
//   });
// };
// async function getFileContent3(fileName) {
//   const a = await getFileContent(fileName);
//   console.log(a);
// }
// getFileContent3("a.json");

// 2.链式调用---太长
const getFileContent = (fileName) => {
  const promise = new Promise((resolve, reject) => {
    const fullName = path.resolve(__dirname, "files", fileName);
    fs.readFile(fullName, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data));
    });
  });
  return promise;
};
getFileContent("a.json")
  .then((a) => {
    console.log(a);
    return getFileContent(a.next);
  })
  .then((b) => {
    console.log(b);
    return getFileContent(b.next);
  })
  .then((c) => {
    console.log(c);
    return "not promise";
  })
  .then((np) => {
    console.log(np);
    // return "not promise2";
  })
  .then((np2) => {
    console.log(np2); //undefined
  });

//1.callback-hell，回调地狱来了--使用promise解决
// const getFileContent = (fileName, callback) => {
//   const fullName = path.resolve(__dirname, "files", fileName);
//   fs.readFile(fullName, (err, data) => {
//     if (err) {
//       console.log(err);
//       return;
//     }

//     data = JSON.parse(data.toString());
//     callback(data);
//   });
// };

// getFileContent("a.json", (data) => {
//   console.log(data);
//   getFileContent(data.next, (e) => {
//     console.log(e);
//     getFileContent(e.next, (e) => {
//       console.log(e);
//     });
//   });
// });
