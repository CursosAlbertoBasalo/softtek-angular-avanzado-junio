import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '@stk/models/trip.interface';

@Component({
  selector: 'stk-trips-list',
  templateUrl: './trips-list.component.html',
  styles: [],
})
export class TripsListComponent implements OnInit {
  @Input() trips: Trip[] = [];
  constructor() {}

  ngOnInit(): void {}
}
