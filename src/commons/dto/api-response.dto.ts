export class ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  code?: string;

  constructor(success: boolean, message: string, data?: T, code?: string) {
    this.success = success;
    this.data = data;
    this.message = message;
    this.code = code;
  }

  static success<T>(message: string, data?: T): ApiResponse<T> {
    return new ApiResponse(true, message, data);
  }

  static error(message: string, code?: string) {
    return new ApiResponse(false, message, undefined, code);
  }
}
