import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agency } from '@stk/models/agency.interface';
import { Response } from '@stk/models/response.interface';
import { catchError, map, Observable, of, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AgenciesService {
  public responsePipe = pipe(
    map((body: Agency[]) => {
      return { data: body, error: null };
    }),
    catchError((error) => {
      return of({ data: null, error: error.message });
    })
  );

  private readonly apiUrl = environment.apiUrl + '/agencies';

  constructor(private http: HttpClient) {}

  getAll$(): Observable<Response<Agency[]>> {
    console.log('getAll$', this.apiUrl);
    return this.http.get<Agency[]>(this.apiUrl).pipe(this.responsePipe);
  }
  getEmpty$(): Observable<any> {
    return of([]).pipe(this.responsePipe);
  }
  getError$(): Observable<any> {
    return this.http.get<Agency[]>(this.apiUrl + '/error').pipe(this.responsePipe);
  }
}
