import { EventEmitter, Injectable, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendSignInLinkToEmail, UserCredential } from "firebase/auth";
import { MessageService } from 'primeng/api';
import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  isLoggedIn = false;
  invalidLogin = false;  
  currentUID = ''
  auth = this.firebaseAuth
  @Output() navigateOnSignedIn = new EventEmitter()

  constructor(public firebaseAuth : AngularFireAuth,
    private router: Router, 
    private messageService: MessageService,
    private http: HttpClient)  { 

  }

  async signIn(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password)
    .then((UserCredential) => {
      console.log(UserCredential.user?.uid)
      this.router.navigate(['/dashboard'])
    }).catch(() => {
      this.invalidLogin = true
    })
  }

  async signUp(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password)
    .then((UserCredential) => {
      const user = UserCredential.user
      const email = UserCredential.user?.email
      const uid = UserCredential.user?.uid
      
      user?.sendEmailVerification()
      .then(() => {
        console.log('email verification sent')
      })

      localStorage.setItem('UID', uid!)
      this.router.navigate(['/dashboard'])

      this.http.post('http://localhost:3000/users', {email, uid}).subscribe(
        (response) => {
          console.log('User data uploaded to database')
        },
        (error) => {
          console.error('error uploading user data to database')
        }
      )
      
    }).catch((error) => {
      console.error('Error signing up: ', error)
    })
  }

  logout() {
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
    this.isLoggedIn = false;
  }

  checkIfLoggedIn(){
    this.auth.onAuthStateChanged((user) => {
      if(user) {
        this.currentUID = user.uid
        this.isLoggedIn = true;
        console.log("logged in")
        this.navigateOnSignedIn.emit()
      } else {
        this.isLoggedIn = false;
        console.log("logged out")
      }  
    })
  }
}
