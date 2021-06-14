import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSignedIn = false;
  user: User = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false,
  };

  loginError = '';

  constructor(public firebaseService: FirebaseService,
    private router: Router) { }

  ngOnInit(): void {
  }

  async onLogin(email: string, password: string) {
    await this.firebaseService.login(email, password).then(() => {
      console.log('logged in');
      this.router.navigate(['/home'])
    }).catch(err => this.loginError = err.message)
    // if (this.firebaseService.isLoggedIn) this.isSignedIn = true;
    // if (this.firebaseService.userData) this.user = this.firebaseService.userData;
  }

}
