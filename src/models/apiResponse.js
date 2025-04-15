import RESPONSE_CODE from "../constants/responseCode.js";

class SuccessResponse {
  constructor({
    success = true,
    data = null,
    title = "OK",
    message = "",
    statusCode = RESPONSE_CODE.OK,
  }) {
    this.success = success;
    this.data = data;
    this.title = title;
    this.message = message;
    this.statusCode = statusCode;
  }
}

class ErrorResponse {
  constructor({
    success = false,
    data = null,
    title = "INTERNAL_SERVER_ERROR",
    message = "",
    statusCode = RESPONSE_CODE.INTERNAL_SERVER_ERROR,
  }) {
    this.success = success;
    this.data = data;
    this.title = title;
    this.message = message || "Something went wrong.";
    this.statusCode = statusCode;
  }
}

export { SuccessResponse, ErrorResponse };
