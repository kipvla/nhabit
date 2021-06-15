import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseService } from './services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn = false;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
    ) { }

  canActivate(): boolean {
    console.log(this.firebaseService.isLoggedIn);
    if (this.firebaseService.firebaseAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in');
        return true;
      } else {
        console.log('user not logged in');
        this.router.navigate(['/landing'])
        return false;
      }
    })) return true;
    else return false;
  }
  
}
