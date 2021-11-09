import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';

import { User } from 'src/app/models/user';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // userData!: User;
  userData: any;
  games: Game[];

  constructor(private firebaseService: FirebaseService,
    private apiClientService: ApiClientService) {}

  ngOnInit(): void {
    this.firebaseService.user$.subscribe((user) => {
      this.userData = user;
    });
    this.firebaseService.firebaseAuth.authState.subscribe((res) => {
      if (res && res.uid) {
        this.userData = res;
      } else {
      }
    });
  }

  fetchGames() {
      this.apiClientService.getGames().subscribe(res => {
      console.log(res);
      this.games = res.filter(game => game.email === this.userData.email);
    })
  }

  showSingleGame(game: Game) {
    console.log(game);
  }
}
