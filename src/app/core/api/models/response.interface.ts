export interface Response<T> {
  name: string;
  data: T | null;
  error: string | null;
}
