import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  login(data): Observable<any>{
    console.log("I am server, man")
    return this.http.post(`${baseUrl}/login`,data, this.httpOptions);
  }

}
