import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { GlobaleventsmanagerService } from 'src/app/service/globaleventsmanager.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  //show login's name
  user$ = this.userService.currentUserProfile$
  langIcon = 'us.svg';
  language = 'English';
  lang: any;
  languages = [
    {
      value: 'en',
      title: 'English',
      image: '/assets/image/us.svg',
    },
    {
      value: 'ar',
      title: 'Arabic',
      image: '/assets/image/sa.svg',
    },
    {
      value: 'tn',
      title: 'India',
      image: '/assets/image/in.svg',
    },
  ];

  constructor(public authService:AuthenticationService,
    private router:Router,private userService:UserService,public translate:TranslateService,
    private globalEvent:GlobaleventsmanagerService){


         //language
    //  translate.addLangs([ 'en','ar'])
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

  //  language image
  async changeLanguage(lang: string) {
    if (lang === 'ar') {
      this.langIcon = 'sa.svg';
      this.language = 'Arabic';
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
      this.lang = lang;
      localStorage.setItem('lang', lang);
    }
    else if (lang === 'tn') {
      this.langIcon = 'in.svg';
      this.language = 'India';
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
      this.lang = lang;
      localStorage.setItem('lang', lang);
    }
    else  {
      this.langIcon = 'us.svg';
      this.language = 'English';
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
      this.lang = lang;
      localStorage.setItem('lang', lang);
    }
  }

  //show navbar when click on profile button
  onProfile(){
    this.router.navigate(['/layout/profile'])

  }

}


