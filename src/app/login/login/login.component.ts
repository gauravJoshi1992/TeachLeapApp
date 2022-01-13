import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupLoginService } from 'src/app/service/signup-login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  

  constructor(private fb: FormBuilder, private signupLoginService: SignupLoginService, private  router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submit(){
    this.signupLoginService.login(this.loginForm.value).subscribe(res => {
      this.router.navigateByUrl('/home');
    })
  }
}
