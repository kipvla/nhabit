import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isSignedIn = false;
  user: User = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false,
  };

  loginError = '';

  constructor(public firebaseService: FirebaseService,
    private router: Router) { }

  onLogin(email: string, password: string) {
    this.firebaseService.login(email, password).then(() => {}).catch(err => {
      this.loginError = err.message
    })
    this.firebaseService.firebaseAuth.authState.subscribe(res => {
      if (res && res.uid) this.router.navigate(['/home'])
      this.firebaseService.error$.subscribe(res => this.loginError = res.message)
    })
    
  }

}
