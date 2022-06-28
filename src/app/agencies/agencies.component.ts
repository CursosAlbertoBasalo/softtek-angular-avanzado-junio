import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agency } from '@stk/models/agency.interface';
import { Response } from '@stk/models/response.interface';
import { AgenciesService } from '@stk/services/agencies.service';

@Component({
  selector: 'stk-agencies',
  templateUrl: './agencies.component.html',
  styles: [],
})
export class AgenciesComponent implements OnInit {
  public agencies: Response<Agency[]> = this.route.snapshot.data['agencies'];
  public name: string = this.route.snapshot.data['name'];

  public searchTerm = '';

  constructor(private route: ActivatedRoute, private agenciesService: AgenciesService) {}

  ngOnInit(): void {}

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.agenciesService
      .getByText$(this.searchTerm)
      .subscribe((response) => (this.agencies = response));
  }
}
