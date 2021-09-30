import { Component } from '@angular/core';

import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user: User = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false,
  };

  registerError = '';

  constructor(public firebaseService: FirebaseService) {}

  async onRegister(email: string, password: string) {
    await this.firebaseService
      .register(email, password)
      .then(() => {
        this.firebaseService.error$.next({ code: '', message: '' });
      })
      .catch((err) => (this.registerError = err.message));
    this.firebaseService.error$.subscribe(
      (res) => (this.registerError = res.message)
    );
  }
}
