import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SignupLoginService } from '../../service/signup-login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private signupLoginService:SignupLoginService, public router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['',[Validators.required, Validators.minLength(5)]],
      lastName: ['',[ Validators.required, Validators.minLength(2)]],
      mailId: ['',[Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"), Validators.required]],
      password: ['', [Validators.required, this.patternValidator]],
      confirmPassword: ['',Validators.required]
      }, {validator: this.confirmPassword})
  }

  

  patternValidator(c: AbstractControl): ValidationErrors {
      if (!c.value) {
        return  {invalidPassword: true};
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(c.value);
      return valid ? {invalidPassword: false} : { invalidPassword: true };
    };
  
   get f(){
    return this.signupForm.controls;
  }

  confirmPassword(c:any): any{
    if(!c.controls.confirmPassword || !c.controls.password){
      return null;
    }
    if(c.controls.confirmPassword.errors && !c.controls.confirmPassword.errors.passwordMismatch ){
      return null;
    }
    if(c.controls.confirmPassword.value !== c.controls.password.value){
      c.controls.confirmPassword.setErrors({passwordMismatch: true})
    } else{
      c.controls.confirmPassword.setErrors(null);
    }
  }

  submit(){
    this.signupLoginService.signUp(this.signupForm.value).subscribe(res=> {
      this.router.navigateByUrl('/home');
    });
  }
}

