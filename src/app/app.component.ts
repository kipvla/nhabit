import { Component } from '@angular/core';
import { User } from './models/user';

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

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) this.isSignedIn = true;
    else this.isSignedIn = false;
  }

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
