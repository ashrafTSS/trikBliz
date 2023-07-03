import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  //forget from
  forgetForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb:NonNullableFormBuilder,
    private authService:AuthenticationService,private toast:HotToastService,private router:Router){}


  ngOnInit(): void {

  }

  //email validation
  get email() {
    return this.forgetForm.get('email');
  }

  submit(){
    const { email } = this.forgetForm.value;
    this.authService.forgetPassword(email)
    setTimeout(() => {
      this.router.navigate(['auth/login'])
    },5000);

  }

}
