import { Component, OnInit } from '@angular/core';
import { Agency } from '@stk/models/agency.interface';
import { HomeService } from './home.service';

@Component({
  selector: 'stk-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  agencies: Agency[] = [];
  // agencies$ = this.service.getAgencies$();
  trips$ = this.service.getTrips$();
  constructor(private service: HomeService) {
    this.service.getAgencies$().subscribe((agencies) => (this.agencies = agencies));
  }

  ngOnInit(): void {}

  loadAgencies() {
    // this.agencies$ = this.service.getAgencies$();
    this.service.getAgencies$().subscribe((agencies) => (this.agencies = agencies));
  }
  loadTrips() {
    this.trips$ = this.service.getTrips$();
  }
}
