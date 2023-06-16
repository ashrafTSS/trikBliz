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
  constructor(
    private auth: Auth,
    private toast: HotToastService,
    private router:Router
  ) {}

  //get current user
  currentUser$ = authState(this.auth);

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
  loginWithGoogle(){
    return from(signInWithPopup(this.auth,new GoogleAuthProvider()).then(res =>{
      this.router.navigate(['layout/home'])
      localStorage.setItem('token',JSON.stringify(res.user.uid))
    }, err =>{
         alert(err.message)
    }))

  }

  //facebook signin
  loginWithFacebook(){

  }

}
