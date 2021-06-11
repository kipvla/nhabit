import { Component } from '@angular/core';
import { User } from './models/user';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isSignedIn = false;
  user: User = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false,
  };

  registerError = '';
  loginError = '';

  constructor(
    public firebaseService: FirebaseService
    ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) this.isSignedIn = true;
    else this.isSignedIn = false;
  }

  // async onRegister(email: string, password: string) {
  //   await this.firebaseService.register(email, password).catch(err => this.registerError = err.message)
  //   if (this.firebaseService.isLoggedIn) this.isSignedIn = true;
  //   if (this.firebaseService.userData) this.user = this.firebaseService.userData;
  // }

  // async onLogin(email: string, password: string) {
  //   await this.firebaseService.login(email, password).catch(err => this.loginError = err.message)
  //   if (this.firebaseService.isLoggedIn) this.isSignedIn = true;
  //   if (this.firebaseService.userData) this.user = this.firebaseService.userData;
  // }

  handleLogout() {
    this.isSignedIn = false;
    this.user = {
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
      emailVerified: false,
    };
  }

}
