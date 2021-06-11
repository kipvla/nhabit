import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ApiClientService } from '../api-client.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;

  userName: string = '';
  userData: any;

  constructor(
    public firebaseAuth: AngularFireAuth,
    private apiClientService: ApiClientService,
    private router: Router
    ) { }

  async login(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(async res => {
      let searchForUserInDB;
      if (res.user) {
        this.apiClientService.findUserByUid(res.user.uid).subscribe(val => {
          searchForUserInDB = val ? val : null;
          // If there is a match and email matches
          console.log(val);
          if (searchForUserInDB && searchForUserInDB.email === email) {
            this.isLoggedIn = true;
            this.userData = {
              uid: res.user?.uid,
              email: res.user?.email,
              displayName: res.user?.displayName,
              photoURL: res.user?.photoURL,
              emailVerified: res.user?.emailVerified,
            }
            console.log(res.user);
            localStorage.setItem('user', JSON.stringify(res.user));
            this.router.navigate(['/home']);
          }
        });
      }
      console.log(searchForUserInDB);
    })
  }

  async register(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      this.isLoggedIn = true;
      console.log('res.user ', res.user);
      this.userData = {
        uid: res.user?.uid,
        email: res.user?.email,
        displayName: res.user?.displayName,
        photoURL: res.user?.photoURL,
        emailVerified: res.user?.emailVerified,
      }
      this.apiClientService.createUser(this.userData).subscribe(res => {
        console.log(res);
        this.userName = this.userData.email;
      });
      console.log("userdata after createUser call ", this.userData);
      localStorage.setItem('user', JSON.stringify(res.user));
      this.router.navigate(['/home']);
    })
  }
  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/dashboard']);
  }
}
