import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanLoad {
  constructor(private router: Router) {}

  public canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    // return false;
    return this.router.createUrlTree(['/login']);
  }
}
