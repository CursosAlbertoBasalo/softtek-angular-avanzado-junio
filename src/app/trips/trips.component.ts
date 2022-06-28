import { Component, OnInit } from '@angular/core';
import { Response } from '@stk/models/response.interface';
import { Trip } from '@stk/models/trip.interface';
import { TripsService } from '@stk/services/trips.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'stk-trips',
  templateUrl: './trips.component.html',
  styles: [],
})
export class TripsComponent implements OnInit {
  private search$: BehaviorSubject<string> = new BehaviorSubject('');

  public trips$!: Observable<Response<Trip[]>>;

  constructor(private tripsService: TripsService) {}

  ngOnInit(): void {
    this.trips$ = this.search$.pipe(
      switchMap((searchTerm: string) => this.tripsService.getByText$(searchTerm))
    );
  }

  public onSearch(searchTerm: string) {
    this.search$.next(searchTerm);

    // this.trips$ = this.tripsService.getByText$(searchTerm);
  }
}
