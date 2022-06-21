import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Agency } from '@stk/models/agency.interface';
import { Trip } from '@stk/models/trip.interface';
import { Observable, Subscription } from 'rxjs';
import { HomeService } from './home.service';

@Component({
  selector: 'stk-home',
  templateUrl: './home.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  public agencies: Agency[] = [];

  public misDatos = [{ empresa: 'Softtek' }];

  private subscriptions: Subscription[] = [];
  // agencies$ = this.service.getAgencies$();
  public trips$: Observable<Trip[]>; // = this.service.getTrips$();

  constructor(private service: HomeService) {
    this.subscriptions.push(
      this.service.getAgencies$().subscribe((agencies) => (this.agencies = agencies))
    );

    this.trips$ = this.service.getTrips$();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entrada'].currentValue !== changes['entrada'].previousValue) {
      console.log();
    }
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  loadAgencies() {
    // this.agencies$ = this.service.getAgencies$();
    this.service.getAgencies$().subscribe((agencies) => (this.agencies = agencies));
  }
  loadTrips() {
    this.trips$ = this.service.getTrips$();
  }
}
