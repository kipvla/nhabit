import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isSignedIn = false;
  user: User = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false,
  };

  registerError = '';

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  async onRegister(email: string, password: string) {
    await this.firebaseService.register(email, password).catch(err => this.registerError = err.message)
    this.firebaseService.error$.subscribe(res => this.registerError = res.message);
  }

}
