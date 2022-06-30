import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionFacade } from '../../session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private sessionService: SessionFacade) {
    this.sessionService.getValidatingCommand$().subscribe((action) => {
      this.validatingEffect(action.payload);
    });
  }

  private validatingEffect(payload: any) {
    this.http.post('', payload).subscribe(
      () => this.sessionService.logInUser(payload.email),
      () => this.sessionService.logOutUser()
    );
  }
}
// { action, current, next }
