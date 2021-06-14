import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseService } from './services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
    ) { }
  canActivate(): boolean {
    if (!this.firebaseService.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/home'])
      return false;
    }
  }
  
}
