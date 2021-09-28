import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient, private _route: ActivatedRoute) {}

  listDados: any = {name: "", balance:0};

  ngOnInit() {
    this.getDados().subscribe(
      data => {
        this.listDados = data;
      }
    );
  }

  getDados(): Observable<any> {
    let id = this._route.snapshot.params['id'];
    return this.http.get(`${baseUrl}/dashboard/${id}`);
  }
}
