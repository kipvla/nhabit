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
            console.log('logged in un-auth')
            return true;
          } else {
            console.log('not logged in un-auth')
            return false;
          }
    })) {
      console.log(this.router.url)
      this.router.navigate(['/home']);
      return false
    };
    console.log(this.router.url)
    return true;
    // console.log(isLoggedIn)
    // if (!isLoggedIn) return true;
    // return false;
  }
  
}
