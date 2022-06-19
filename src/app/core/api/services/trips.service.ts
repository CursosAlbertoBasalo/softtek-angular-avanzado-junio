import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trip } from '@stk/models/trip.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  private readonly apiUrl = environment.apiUrl + '/trips';

  constructor(private http: HttpClient) {}

  getAll$(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }
  getError$(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl + '/error');
  }
}
