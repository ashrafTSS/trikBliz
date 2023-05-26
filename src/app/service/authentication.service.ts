import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth:Auth) { }

  currentUser$ = authState(this.auth)
  //login
  login(username:string,password:string): Observable<any>{
    return from(signInWithEmailAndPassword(this.auth,username,password))
  }

  //logout
  logout():Observable<any>{
    return from(this.auth.signOut())
  }

}
