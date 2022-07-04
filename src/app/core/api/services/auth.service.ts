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

  private validatingEffect(credentials: any) {
    this.http.post<string>('', credentials).subscribe(
      (access_token: string) =>
        this.sessionService.logInUser({ email: credentials.email, access_token }),
      (error: any) => this.sessionService.logOutUser()
    );
  }
}
// { action, current, next }
