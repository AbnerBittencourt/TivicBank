import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


interface IData{
  name: string;
  balance: number;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return [
            { title: 'Saldo', cols: 1, rows: 1 },
          ];
        }

        return [
          { title: 'Saldo', cols: 2, rows: 1 }
        ];
      })
    );

  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient) {}

  listDados: IData[];

  ngOnInit() {
    this.getDados().subscribe(
      data => {
        this.listDados = data;
      }
    );
  }

  getDados(): Observable<any> {
    return this.http.get("http://localhost:3000/dashboard");
  }
}
