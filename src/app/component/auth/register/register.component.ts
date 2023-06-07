import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';


export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  signUpForm = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatchValidator() }
  );

  constructor(private fb: NonNullableFormBuilder,
    private toast:HotToastService,private authService:AuthenticationService,
    private router:Router,private userService:UserService){}

  ngOnInit(): void { }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get name() {
    return this.signUpForm.get('name');
  }

  //register
  submit(){
    if(!this.signUpForm.valid) return;
    const {name,email,password} = this.signUpForm.value;
   this.authService.signUp(email,password).pipe(
    switchMap(({ user: { uid } }) =>
    this.userService.addUser({ uid, email, displayName: name })
  ),
    this.toast.observe({
      success :'congrats! You are all signed up',
      loading :'Signing in',
      error:({message}) =>'${message}'
    })
   ).subscribe(()=>{
    this.router.navigate((['/auth/login']))
   })
  }


}
