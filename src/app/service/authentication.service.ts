import { Injectable } from '@angular/core';
import {
  Auth,
  UserCredential,
  UserInfo,
  authState,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from '@angular/fire/auth';
import { Observable, concatMap, from, of, switchMap } from 'rxjs';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from '@angular/fire/auth';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  users : any
  signIn(PROVIDER_ID: string) {
    throw new Error('Method not implemented.');
  }
  authState2: any;
  constructor(
    private auth: Auth,
    private toast: HotToastService,
    private router:Router,

  ) {}

  //get current user
  currentUser$ = authState(this.auth);

  //get google user
  currentUser: any;

  //login
  login(username: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  //loggeddIn
  loggedIn() {
    return;
  }

  //logout
  logout(): Observable<any> {
    return from(this.auth.signOut());
  }

  //register
  signUp(email: any, password: any) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  //upload image
  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap((user) => {
        if (!user) throw new Error('Not Authenticated');
        return updateProfile(user, profileData);
      })
    );
  }


  //forget password
  forgetPassword(email: any) {
    return from(sendPasswordResetEmail(this.auth, email))
      .pipe(
        this.toast.observe({
          loading: 'Logging in...',
          success: 'Send your email address please look at',
          error: ({ message }) => `There was an error: ${message} `,
        })
      )
      .subscribe();
  }

  //google signin
  loginWithGoogle(): Observable<any>{
    return from(signInWithPopup(this.auth,new GoogleAuthProvider()).then(res =>{
      this.toast.success('congrats! you have successfully google signin')
      this.router.navigate(['layout/home'])
      const user = res.user
      this.currentUser = user
      console.log(res.user);
      localStorage.setItem('user',JSON.stringify(user))

    }, err =>{
        this.toast.error(err.message)
    }))

  }


  //facebook signin
  loginWithFacebook(){
    return from(signInWithPopup(this.auth,new FacebookAuthProvider).then(res =>{
      this.toast.success('congrats! you have successfully facebook signin')
      this.router.navigate(['layout/home'])
      localStorage.setItem('token',JSON.stringify(res.user.uid))
    }, err =>{
        //  alert(err.message)
        this.toast.error(err.message)
    }))

  }



  //google signout
  googlelogout(): Observable<any> {
    return from(this.auth.signOut());
  }

  //github signin
  loginWithGithub(){

  }

  //current google user


}
