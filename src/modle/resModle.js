//定义返回success与error的类

class BaseModle {
  constructor(data, message) {
    if (typeof data === "string") {
      this.message = data;
      data = null;
      message = null;
    }
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

//1.
class SuccessModle extends BaseModle {
  constructor(data, message) {
    super(data, message);
    this.errorNum = 0;
  }
}

//2.
class ErrorModle extends BaseModle {
  constructor(data, message) {
    super(data, message);
    this.errorNum = -1;
  }
}

module.exports = {
  SuccessModle,
  ErrorModle,
};
