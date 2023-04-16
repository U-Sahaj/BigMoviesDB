export type IResult<T> = {
  success: boolean;
  message?: string;
  data?: T;
}