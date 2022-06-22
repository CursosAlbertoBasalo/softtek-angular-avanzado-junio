import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Agency } from '@stk/models/agency.interface';
import { Response } from '@stk/models/response.interface';
import { Trip } from '@stk/models/trip.interface';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';

@Component({
  selector: 'stk-home',
  templateUrl: './home.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public agencies$: Observable<Response<Agency[]>>;
  public trips$: Observable<Response<Trip[]>>;

  constructor(private service: HomeService) {
    this.agencies$ = this.service.getAgencies$();
    this.trips$ = this.service.getTrips$();
  }

  loadAgencies() {
    this.agencies$ = this.service.getAgencies$();
  }
  loadTrips() {
    this.trips$ = this.service.getTrips$();
  }
}
