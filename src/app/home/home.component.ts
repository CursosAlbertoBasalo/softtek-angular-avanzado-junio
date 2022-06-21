import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';

@Component({
  selector: 'stk-home',
  templateUrl: './home.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public agencies$: Observable<any>;
  public trips$: Observable<any>;

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
