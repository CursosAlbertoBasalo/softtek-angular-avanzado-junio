import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agency } from '@stk/models/agency.interface';
import { ResponseBase } from '@stk/models/response.base';
import { Response } from '@stk/models/response.interface';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AgenciesService extends ResponseBase<Agency[]> {
  private readonly apiUrl = environment.apiUrl + '/agencies';

  constructor(private http: HttpClient) {
    super();
  }

  public getAll$(): Observable<Response<Agency[]>> {
    console.log('getAll$', this.apiUrl);
    return this.http.get<Agency[]>(this.apiUrl).pipe(this.responsePipe);
  }
  public getEmpty$(): Observable<any> {
    return of([]).pipe(this.responsePipe);
  }
  public getError$(): Observable<any> {
    return this.http.get<Agency[]>(this.apiUrl + '/error').pipe(this.responsePipe);
  }
  public getByText$(text: string | null): Observable<Response<Agency[]>> {
    if (text === null || text == '') return this.getAll$();
    return this.http.get<Agency[]>(this.apiUrl + '?q=' + text).pipe(this.responsePipe); // .pipe(delay(3000));
  }
}
