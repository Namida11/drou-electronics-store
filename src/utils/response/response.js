class BaseResponse {
  constructor(status, success, message, data) {
    this.status = status;
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

class SuccessResponse extends BaseResponse {
  constructor(status, message = null, data = null) {
    super(status, true, message, data);
  }
}

class ErrorResponse extends BaseResponse {
  constructor(status, message = null) {
    super(status, false, message);
  }
}

export { SuccessResponse, ErrorResponse };
