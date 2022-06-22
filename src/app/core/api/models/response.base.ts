import { catchError, map, of, pipe } from 'rxjs';

export class ResponseBase<T> {
  public responsePipe = pipe(
    map((body: T) => {
      return { data: body, error: null };
    }),
    catchError((error) => {
      return of({ data: null, error: error.message });
    })
  );
}
