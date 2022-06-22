import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trip } from '@stk/models/trip.interface';
import { catchError, map, Observable, of, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  public responsePipe = pipe(
    map((body) => {
      return { name: 'Trips', data: body, error: null };
    }),
    catchError((error) => {
      return of({ name: 'Trips', data: null, error: error.message });
    })
  );

  private readonly apiUrl = environment.apiUrl + '/trips';

  constructor(private http: HttpClient) {}

  getAll$(): Observable<any> {
    console.log('getAll$', this.apiUrl);
    return this.http.get<Trip[]>(this.apiUrl).pipe(this.responsePipe);
  }
  getEmpty$(): Observable<any> {
    return of([]).pipe(this.responsePipe);
  }
  getError$(): Observable<any> {
    return this.http.get<Trip[]>(this.apiUrl + '/error').pipe(this.responsePipe);
  }
}
