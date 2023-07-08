import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signUpEmail =  new FormControl('')
  signUpPassword =  new FormControl('')


  constructor(private router: Router, public firebaseService: FirebaseService) {

  }

  async onSignup() {
    await this.firebaseService.signUp(this.signUpEmail.value!, this.signUpPassword.value!)
    if(this.firebaseService.isLoggedIn) {
      this.router.navigate(['/dashboard'])
    }

  }

  goToLogin() {
    this.router.navigate(['login'])
  }

}
