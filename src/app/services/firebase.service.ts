import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ApiClientService } from './api-client.service';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;

  userName: string = '';
  userData: any;

  user: User = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false,
  } || null
  user$ = new BehaviorSubject<User>(this.user);

  constructor(
    public firebaseAuth: AngularFireAuth,
    private apiClientService: ApiClientService,
    private router: Router
    ) { }

  async login(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then((res) => {
      let searchForUserInDB;
      if (res.user && res.user.uid) {
        this.apiClientService.findUserByUid(res.user.uid).subscribe(val => {
          searchForUserInDB = val ? val : null;
          // If there is a match and email matches
          console.log(val);
          if (searchForUserInDB && searchForUserInDB.email === email) {
            console.log('past the search bit')
            this.user = {
              uid: res.user?.uid || '',
              email: res.user?.email || '',
              displayName: res.user?.displayName || '',
              photoURL: res.user?.photoURL || '',
              emailVerified: res.user?.emailVerified || false,
            };
            this.user$.next(this.user);
            this.isLoggedIn = true;
            this.userData = {
              uid: res.user?.uid,
              email: res.user?.email,
              displayName: res.user?.displayName,
              photoURL: res.user?.photoURL,
              emailVerified: res.user?.emailVerified,
            }
            console.log(res.user);
            console.log(this.userData)
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
      this.user = {
        uid: res.user?.uid || '',
        email: res.user?.email || '',
        displayName: res.user?.displayName || '',
        photoURL: res.user?.photoURL || '',
        emailVerified: res.user?.emailVerified || false,
      }
      this.user$.next(this.user);
      this.apiClientService.createUser(this.userData).subscribe(res => {
        console.log(res);
        this.userData = res;
      });
      console.log("userdata after createUser call ", this.userData);
      localStorage.setItem('user', JSON.stringify(res.user));
      this.router.navigate(['/home']);
    })
  }

  async updateProfile(body: {}) {
    console.log('update profile called with ', body);
    await this.firebaseAuth.currentUser.then(res => {
      console.log(res);
      res?.updateProfile(body).then(() => {
        console.log('updated profile')
        this.user = {
          ...this.user, ...body}
        this.user$.next(this.user);
      }, (error) => {
        console.log(error);
      });
    });
  }

  logout() {
    this.firebaseAuth.signOut()
    .then(() => {
      console.log('Logged out!')
      this.isLoggedIn = false;
      localStorage.removeItem('user');
      this.router.navigate(['/dashboard']);
      return true;
    })
    .catch(err => console.log(`Error logging out: ${err}`));
  }
}
