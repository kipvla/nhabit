import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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

  ngOnInit(): void {
  }

  onLogin(email: string, password: string) {
    this.firebaseService.login(email, password).then(() => {
      console.log('logged in');
    }).catch(err => {
      this.loginError = err.message
      console.log(this.loginError);
    })
    this.firebaseService.firebaseAuth.authState.subscribe(res => {
      if (res && res.uid) this.router.navigate(['/home'])
      this.firebaseService.error$.subscribe(res => this.loginError = res.message)
    })
    
  }

}
