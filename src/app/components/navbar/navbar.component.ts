import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoading = true;
  isLoggedIn: boolean = false;
  isMobile = window.innerWidth < 768 ? true : null;
  isModalShowing = false;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.firebaseService.firebaseAuth.authState.subscribe((res) => {
      if (res && res.uid) {
        this.isLoggedIn = true;
      } else {
      }
      this.isLoading = false;
    });
  }

  logout() {
    this.firebaseService.logout();
    this.firebaseService.firebaseAuth.authState.subscribe((res) => {
      if (res && res.uid) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
      this.isLoading = false;
    });
    // this.isLoggedIn = false;
    this.isModalShowing = false;
    this.router.navigate(['/dashboard']);
  }

  toggleModal() {
    this.isModalShowing = !this.isModalShowing;
  }

  onResize(event: any) {
    const size = event.target.innerWidth;
    if (size <= 768) this.isMobile = true;
    else this.isMobile = null;
  }
}
