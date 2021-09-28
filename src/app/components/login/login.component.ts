import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.formGroup = new FormGroup({
      cpf: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  loginProcess(){
    if(this.formGroup.valid){
      this.authService.login(this.formGroup.value).subscribe(
        (response) => {
          let responseData = JSON.stringify(response);
          localStorage.setItem("dados", responseData);
          this.router.navigate(['dashboard', response.user.id]);
        },
        () => {
          this.toastr.error("Credenciais inválidas.");
        }
      );
    }

  }
}
