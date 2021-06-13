import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client.service';
import { FirebaseService } from '../../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userName = '';
  uid = '';

  userData: any;

  @Output() isLogout = new EventEmitter<void>()

  constructor(
    public firebaseService: FirebaseService,
    private apiClientService: ApiClientService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.firebaseService.user$.subscribe(user => {
      console.log(user);
      this.userData = user;
    });
    this.firebaseService.firebaseAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.uid = res.uid;
        console.log('user is logged in');
      } else {
        console.log('user not logged in');
      }
    })
  }

  async addUsername(username: string) {
    this.firebaseService.updateProfile({displayName: username});
    if (this.userData.uid) return await this.apiClientService.findUserByUidAndAddDisplayName(this.userData.uid, username)
    .subscribe(res => {
      this.userName = res.displayName
      this.router.navigate(['/home'])
    });
    else return null;
  }

}
