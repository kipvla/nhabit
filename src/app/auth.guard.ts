import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseService } from './services/firebase/firebase.service';

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
    if (this.firebaseService.firebaseAuth.authState.subscribe(res => {
      if (res && res.uid) {
        return true;
      } else {
        this.router.navigate(['/landing'])
        return false;
      }
    })) return true;
    else return false;
  }
  
}
