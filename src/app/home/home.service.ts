import { Injectable } from '@angular/core';
import { Trip } from '@stk/models/trip.interface';
import { AgenciesService } from '@stk/services/agencies.service';
import { TripsService } from '@stk/services/trips.service';
import { catchError, delay, map, Observable, of, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public errorPipe = pipe(
    map((datos) => {
      return { datos: datos, error: null };
    }),
    catchError((error) => {
      return of({ datos: null, error: { dataName: 'algo', errorMessage: error.message } });
    })
  );

  constructor(private agencies: AgenciesService, private trips: TripsService) {}
  getAgencies$(): Observable<any> {
    return this.agencies.getAll$().pipe(delay(1500)).pipe(this.errorPipe);
    // return this.getEmpty$();
    // return this.getError$();
  }
  getTrips$(): Observable<Trip[]> {
    return this.trips.getAll$().pipe(delay(500));
    // return this.getEmpty$();
    // return this.getError$();
  }

  private getEmpty$(): Observable<any> {
    return of([]).pipe(delay(1000));
  }
  private getError$(): Observable<any> {
    return this.agencies.getError$().pipe(this.errorPipe);
  }
}
