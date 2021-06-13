import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData!: User;

  constructor(
  private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.firebaseService.user$.subscribe(user => {
      console.log(user);
      this.userData = user;
    });
  }

}
