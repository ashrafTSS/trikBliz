import { Component, OnInit} from '@angular/core';
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
export class NavComponent implements OnInit {

  //show login's name
  user$ = this.userService.currentUserProfile$

  //google user's display
  currentUser: any;

  //facebook user
  currentFace :any

  //github user
  gitUser:any

  //google button
  isGoogleLogin = false
  isFacebookLogin = false

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



  constructor(public authService:AuthenticationService,
    private router:Router,private userService:UserService,public translate:TranslateService,
    private toast:HotToastService){

      //language
     translate.setDefaultLang('en')

    }

    ngOnInit(){

 // facebook user
 this.currentFace = this.authService.currentFace || JSON.parse(localStorage.getItem('facebook') || 'null');
 console.log('sfhsi443', this.currentFace);

//google user
this.currentUser = this.authService.currentUser || JSON.parse(localStorage.getItem('google') || 'null');
console.log('sfhsi44', this.currentUser);

//github user
this.gitUser = this.authService.gitUser || JSON.parse(localStorage.getItem('github') || 'null');
console.log('sfhsi45', this.gitUser);

  }

  //logout
  logout(){
    this.authService.logout()
    localStorage.removeItem('user')
    this.router.navigate(['/auth/login'])
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
    localStorage.removeItem('google')
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

  //facebook logout
  faceLogout(){
    localStorage.removeItem('facebook')
    this.authService
    .facebookLogout()
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

  //github logout
  githubLogout(){
    localStorage.removeItem('github')
    this.authService
    .githubLogout()
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

