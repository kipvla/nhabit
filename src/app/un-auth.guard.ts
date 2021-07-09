import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { FirebaseService } from './services/firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }
  canActivate(): boolean {
    if (!this.firebaseService.firebaseAuth.authState.subscribe(res => {
      if (res && res.uid) {
            return true;
          } else {
            return false;
          }
    })) {
      return false
    };
    return true;
  }
  
}
