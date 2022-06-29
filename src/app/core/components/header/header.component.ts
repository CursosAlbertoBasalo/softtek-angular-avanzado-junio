import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from '../../session.service';

@Component({
  selector: 'stk-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  public title = 'Softtek';
  public isAuthenticated$: Observable<boolean> = this.sessionService.isAuthenticated$();
  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {}

  public onLogOut() {
    this.sessionService.logOutUser();
  }
}
