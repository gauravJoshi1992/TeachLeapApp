import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupLoginService {

  constructor( private http: HttpClient) { }

  setUser(body: any): Observable<any>{
    const headers= {'Content-type': 'application/json'}
    return this.http.post('http://localhost:4000/sign-up', body, { headers });
  }

  login(body: any): Observable<any>{
    return this.http.post('http://localhost:4000/login', body);
  }
}
