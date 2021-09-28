import { Component,  } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthServiceService } from '../../services/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  formGroup: FormGroup;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private http: HttpClient,
    private _route: ActivatedRoute,
    private router: Router,
    private authService: AuthServiceService,
    private toastr: ToastrService
  ) {}

  listDados: any = {name: "", balance:0};

  ngOnInit() {
    this.getDados().subscribe(
      data => {
        this.listDados = data;
      }
    );
    this.initForm();
  }

  initForm(){
    this.formGroup = new FormGroup({
      account: new FormControl('', [Validators.required]),
      balance: new FormControl(),
    });
  }

  sendData(){
    if(this.formGroup.valid){
      this.authService.deposit(this.formGroup.value).subscribe(
        (response) => {
          window.location.reload();
        },
        () => {
          this.toastr.error("Operação inválida")
        }
      );
    }
  }

  sendWithdraw(){
    let id = this._route.snapshot.params['id'];
    this.authService.withdraw(id,this.formGroup.value).subscribe(
      (response) => {
        window.location.reload();
      },
      () => {
        this.toastr.error("Operação inválida")
      }
    );
  }


  getDados(): Observable<any> {
    let id = this._route.snapshot.params['id'];
    return this.http.get(`${baseUrl}/dashboard/${id}`);
  };

}
