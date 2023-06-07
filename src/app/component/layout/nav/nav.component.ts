import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  //show login's name
  user$ = this.userService.currentUserProfile$


  constructor(public authService:AuthenticationService,
    private router:Router,private userService:UserService,public translate:TranslateService){
         //language
     translate.addLangs(['en','ar'])
     translate.setDefaultLang('en')
    }

  //logout
  logout(){
    this.authService.logout()
    this.router.navigate(['auth/login'])
  }

   //language change method
   switchLang(lang:string){
    this.translate.use(lang)
 }

}