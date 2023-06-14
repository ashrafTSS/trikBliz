import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
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
    private authService:AuthenticationService){}


  ngOnInit(): void {

  }

  //email validation
  get email() {
    return this.forgetForm.get('email');
  }

  submit(){
    console.log("please send valid email");

  }
}
