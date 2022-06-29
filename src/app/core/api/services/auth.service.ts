import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from '../../session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private sessionService: SessionService) {
    this.sessionService.getValidatingCommand$().subscribe((change) => {
      this.validatingEffect(change.action.payload);
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
