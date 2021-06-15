import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isMobile = window.innerWidth < 768 ? true : null;
  isModalShowing = false;

  constructor(
    private firebaseService: FirebaseService, 
    private router: Router
    ) { }

  ngOnInit(): void {
    this.firebaseService.firebaseAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.isLoggedIn = true;
        console.log('user is logged in');
      } else {
        console.log('user not logged in');
      }
    })
  }

  logout() {
    this.firebaseService.logout();
    this.isLoggedIn = false;
    this.isModalShowing = false;
    this.router.navigate(['/dashboard'])
  }

  toggleModal() {
    console.log('show modal please')
    this.isModalShowing = !this.isModalShowing;
  }

}
