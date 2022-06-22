import { Component, Input, OnInit } from '@angular/core';
import { Agency } from '@stk/models/agency.interface';

@Component({
  selector: 'stk-agencies-list',
  templateUrl: './agencies-list.component.html',
  styles: [],
})
export class AgenciesListComponent implements OnInit {
  @Input() agencies: Agency[] = [];
  constructor() {}

  ngOnInit(): void {}
}
