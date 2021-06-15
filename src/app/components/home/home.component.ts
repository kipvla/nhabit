import { Component, OnInit } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client.service';
import { FirebaseService } from '../../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mobile = window.innerWidth < 768 ? true : null;

  userName = '';
  uid = '';

  games = [
    {title: 'click', isOnMobile: null, isOnComputer: true},
    {title: 'type', isOnMobile: true, isOnComputer: true},
    {title: 'swipe', isOnMobile: true, isOnComputer: false},
  ]

  userData: any;

  constructor(
    public firebaseService: FirebaseService,
    private apiClientService: ApiClientService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.firebaseService.user$.subscribe(user => {
      this.userData = user;
      console.log(this.userData);
    });
    this.firebaseService.firebaseAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.uid = res.uid;
        this.userData = res;
        console.log(res);
        console.log('user is logged in');
      } else {
        console.log('user not logged in');
      }
    })
    this.games = this.mobile ? this.games.filter(game => game.isOnMobile) : this.games.filter(game => game.isOnComputer);
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
