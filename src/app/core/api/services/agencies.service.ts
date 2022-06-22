import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Agency } from '../models/agency.interface';

@Injectable({
  providedIn: 'root',
})
export class AgenciesService {
  public responsePipe = pipe(
    map((body) => {
      return { name: 'Agencies', data: body, error: null };
    }),
    catchError((error) => {
      return of({ name: 'Agencies', data: null, error: error.message });
    })
  );

  private readonly apiUrl = environment.apiUrl + '/agencies';

  constructor(private http: HttpClient) {}

  getAll$(): Observable<any> {
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
