import { transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { fadeIn, fadeOut, slider } from './animations/animation';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slider,
    trigger("carouselAnimation", [
      transition("void => *", [useAnimation(fadeIn, {params: {time: '800ms'}})]),
      transition("* => void", [useAnimation(fadeOut, {params: {time: '400ms'}})]),
    ])
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

  isMobile = window.innerWidth < 768 ? true : false;
  isMobile$ = new BehaviorSubject<boolean>(this.isMobile);

  constructor() { }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
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

  onResize(event: any) {
    const size = event.target.innerWidth;
    if (size <= 768) this.isMobile = true;
    else this.isMobile = false;
  }

}
