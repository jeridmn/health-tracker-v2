import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../service/firebase.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  signInEmail = new FormControl('')
  signInPassword = new FormControl('')

  constructor(private router: Router, private currentRoute: ActivatedRoute,
     public firebaseService: FirebaseService) {

  }

  ngOnInit(): void {
  }

 

  async onSignIn() {
    await this.firebaseService.signIn(this.signInEmail.value!, this.signInPassword.value!)
    if(this.firebaseService.isLoggedIn) {
      this.router.navigate(['/dashboard'])
    }
  }

  goToCreateAccount() {
    this.router.navigate(['/signup'])
  }
}
