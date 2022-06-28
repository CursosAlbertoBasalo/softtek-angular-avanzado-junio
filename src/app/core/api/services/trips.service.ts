import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseBase } from '@stk/models/response.base';
import { Response } from '@stk/models/response.interface';
import { Trip } from '@stk/models/trip.interface';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TripsService extends ResponseBase<Trip[]> {
  private readonly apiUrl = environment.apiUrl + '/trips';

  constructor(private http: HttpClient) {
    super();
  }

  getAll$(): Observable<Response<Trip[]>> {
    console.log('getAll$', this.apiUrl);
    return this.http.get<Trip[]>(this.apiUrl).pipe(this.responsePipe);
  }
  getEmpty$(): Observable<any> {
    return of([]).pipe(this.responsePipe);
  }
  getError$(): Observable<any> {
    return this.http.get<Trip[]>(this.apiUrl + '/error').pipe(this.responsePipe);
  }
  public getByText$(text: string | null): Observable<Response<Trip[]>> {
    if (text === null || text == '') return this.getAll$();
    return this.http.get<Trip[]>(this.apiUrl + '?q=' + text).pipe(this.responsePipe); // .pipe(delay(3000));
  }
}
