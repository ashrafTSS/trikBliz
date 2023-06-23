import { Component} from '@angular/core';
import { user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
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
  valu : any
  user1 : any
  //google user's display
  currentUser: any;

  //translate
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
  imageUrl: any;
  imgUrl: any;


  constructor(public authService:AuthenticationService,
    private router:Router,private userService:UserService,public translate:TranslateService,
    private toast:HotToastService){

      //language
     translate.setDefaultLang('en')

    }

    ngOnInit(){
//google user
  this.currentUser = this.authService.currentUser || JSON.parse(localStorage.getItem('user') || "")
  console.log('sfhsi44', this.currentUser);

    }


  //logout
  logout(){
    this.authService.logout()
    localStorage.removeItem('user')
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

  //google logout
  glogout(){
    localStorage.removeItem('user')
    this.authService
    .googlelogout()
    .pipe(
      this.toast.observe({
        success: 'Logged out successfully',
        loading: 'Logging in...',
        error: `There was an error:`
      })
    )
    .subscribe(()=>{
      this.router.navigate(['/auth/login'])
    })

  }


}

