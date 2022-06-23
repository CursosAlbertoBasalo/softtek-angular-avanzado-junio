import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Agency } from '@stk/models/agency.interface';
import { Response } from '@stk/models/response.interface';
import { AgenciesService } from '@stk/services/agencies.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgenciesResolver implements Resolve<Response<Agency[]>> {
  constructor(private agenciesService: AgenciesService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Response<Agency[]>> {
    return this.agenciesService.getAll$();
  }
}
