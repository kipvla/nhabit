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
    this.firebaseAuth.setPersistence('local').then( async () => {
      console.log('signing in with persistence apparently')
      await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        let searchForUserInDB;
        console.log('hello from register route')
        if (res.user && res.user.uid) {
          this.apiClientService.findUserByUid(res.user.uid).subscribe(val => {
            searchForUserInDB = val ? val : null;
            // If there is a match and email matches
            if (searchForUserInDB && searchForUserInDB.email === email) {
              console.log('match found in db')
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
              this.router.navigate(['/home']);
            }
          });
        }
      })
    })
    .catch((err) => console.log(err));
  }

  async register(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      this.isLoggedIn = true;
      this.user = {
        uid: res.user?.uid || '',
        email: res.user?.email || '',
        displayName: res.user?.displayName || '',
        photoURL: res.user?.photoURL || '',
        emailVerified: res.user?.emailVerified || false,
      }
      this.user$.next(this.user);
      this.apiClientService.createUser(this.user).subscribe(res => {
        console.log(res);
        this.userData = res;
      });
      this.router.navigate(['/home']);
    })
    .catch(err => console.log(err));
  }

  async updateProfile(body: {}) {
    await this.firebaseAuth.currentUser.then(res => {
      console.log(res);
      res?.updateProfile(body).then(() => {
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
      this.isLoggedIn = false;
      localStorage.removeItem('user');
      this.router.navigate(['/dashboard']);
      return true;
    })
    .catch(err => console.log(`Error logging out: ${err}`));
  }
}
