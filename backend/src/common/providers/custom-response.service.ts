// CustomResponse.ts
export default class CustomResponse {
  public statusCode: number;
  public message: string;
  public result: any;
  public success: boolean;

  constructor(
    statusCode: number = 200,
    message: string = "Success",
    result?: any,
    success: boolean = true,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.result = result;
    this.success = success;
  }
}