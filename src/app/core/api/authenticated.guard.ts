import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanLoad {
  public canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    return false;
  }
}
