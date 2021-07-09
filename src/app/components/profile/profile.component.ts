import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // userData!: User;
  userData: any;

  constructor(
  private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.firebaseService.user$.subscribe(user => {
      this.userData = user;
    });
    this.firebaseService.firebaseAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.userData = res;
      } else {
      }
    })
  }

}
