import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './models/user';
import {slider} from './animations/animation'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slider
  ]
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

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

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
