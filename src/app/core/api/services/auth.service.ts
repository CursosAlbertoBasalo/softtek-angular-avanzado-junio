import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from '../../session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private sessionService: SessionService) {
    this.sessionService.getChanges$().subscribe((change) => {
      if (change.action.type == 'VALIDATING') {
        const { email, password } = change.next.user;
        this.http.post('', email, password).subscribe(
          () => this.sessionService.logInUser(email),
          () => this.sessionService.logOutUser()
        );
      }
    });
  }
}
// { action, current, next }
