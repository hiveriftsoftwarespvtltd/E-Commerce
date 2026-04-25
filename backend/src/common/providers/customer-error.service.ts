// CustomError.ts
export default class CustomError extends Error {
  public statusCode: number;
  public success: boolean;
  public timestamp: string;

  constructor(statusCode: number = 500, message: string = "Error") {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.timestamp = new Date().toISOString();
  }
}