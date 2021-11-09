import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';

import { fadeIn, fadeOut } from '../../../animations/animation';

@Component({
  selector: 'app-click-game',
  templateUrl: './click-game.component.html',
  styleUrls: ['./click-game.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        useAnimation(fadeIn, { params: { time: '800ms' } }),
      ]),
      transition('* => void', [
        useAnimation(fadeOut, { params: { time: '400ms' } }),
      ]),
    ]),
  ],
})
export class ClickGameComponent implements OnInit {
  device = window.innerWidth < 768 ? 'phone' : 'computer';

  slideNo = 0;

  isAddingObservation = false;

  public slides: [];
  public game: Game;
  areSlidesLoaded = false;

  constructor(private apiClientService: ApiClientService) {}

  ngOnInit(): void {
    this.apiClientService.getSampleGame().subscribe(res => {
      this.game = res;
      this.slides = res.slides;
      this.areSlidesLoaded = true;
    })
  }

  onNextClick() {
    this.slideNo++;
  }

  toggleAddObservation() {
    this.isAddingObservation = !this.isAddingObservation;
  }
}
