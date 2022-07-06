import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Agency } from '@stk/models/agency.interface';
import { Response } from '@stk/models/response.interface';
import { Trip } from '@stk/models/trip.interface';
import { Observable, tap } from 'rxjs';
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

  constructor(private service: HomeService, title: Title, meta: Meta) {
    title.setTitle('Welcome Softtek');
    // meta.updateTag({ name: 'description', content: 'Sample app for softtek' });
    this.agencies$ = this.service.getAgencies$().pipe(
      tap((response) => {
        meta.updateTag({
          name: 'description',
          content: 'Showing Agencies ' + response.data?.length,
        });
      })
    );
    this.trips$ = this.service.getTrips$();
  }

  loadAgencies() {
    this.agencies$ = this.service.getAgencies$();
  }
  loadTrips() {
    this.trips$ = this.service.getTrips$();
  }
}
