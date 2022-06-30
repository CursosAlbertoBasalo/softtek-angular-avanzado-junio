import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionFacade } from '../../session.service';

@Component({
  selector: 'stk-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  public title = 'Softtek';
  public isAuthenticated$: Observable<boolean> = this.sessionService.isAuthenticated$();
  constructor(private sessionService: SessionFacade) {}

  ngOnInit(): void {}

  public onLogOut() {
    this.sessionService.logOutUser();
  }
}
