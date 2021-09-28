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
    return this.http.post(`${baseUrl}/login`, data, this.httpOptions);
  }

  deposit(data): Observable<any>{
    let dados = {
      account: data.account,
      balance: parseFloat(data.balance)
    }
    let dataS = JSON.stringify(dados);
    console.log(dataS)
    return this.http.post(`${baseUrl}/dashboard/deposit`, dataS, this.httpOptions);
  }

  withdraw(id,data): Observable<any>{
    return this.http.post(`${baseUrl}/dashboard/withdraw/${id}`, data, this.httpOptions);
  }
}
