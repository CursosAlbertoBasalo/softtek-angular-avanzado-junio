import { Injectable } from '@angular/core';
import { Trip } from '@stk/models/trip.interface';
import { AgenciesService } from '@stk/services/agencies.service';
import { TripsService } from '@stk/services/trips.service';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private agencies: AgenciesService, private trips: TripsService) {}

  public getAgencies$(): Observable<any> {
    return this.agencies.getAll$().pipe(delay(1500));
    // return this.agencies.getEmpty$();
    // return this.agencies.getError$();
  }
  public getTrips$(): Observable<Trip[]> {
    return this.trips.getAll$().pipe(delay(500));
    // return this.agencies.getEmpty$();
    // return this.agencies.getError$();
  }
}
