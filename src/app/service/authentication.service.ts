import { Injectable } from '@angular/core';
import { Auth, UserCredential, UserInfo, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Observable, concatMap, from, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth:Auth) { }

  //get current user
  currentUser$ = authState(this.auth)

  //login
  login(username:string,password:string): Observable<any>{
    return from(signInWithEmailAndPassword(this.auth,username,password))
  }

  //loggeddIn
  loggedIn(){
    return
  }

  //logout
  logout():Observable<any>{
    return from(this.auth.signOut())
  }

  //register
  signUp(email: any, password: any) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  //upload image
  updateProfileData(profileData:Partial<UserInfo>):Observable<any>{
    const user = this.auth.currentUser
    return of(user).pipe(
      concatMap(user=>{
        if(!user) throw new Error('Not Authenticated')
        return updateProfile(user,profileData)
      })
    )
  }

}
