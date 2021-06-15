import { trigger, transition, style, animate, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {slider, fadeIn, fadeOut} from '../../../animations/animation';

@Component({
  selector: 'app-click-game',
  templateUrl: './click-game.component.html',
  styleUrls: ['./click-game.component.scss'],
  animations: [
    trigger("carouselAnimation", [
      transition("void => *", [useAnimation(fadeIn, {params: {time: '800ms'}})]),
      transition("* => void", [useAnimation(fadeOut, {params: {time: '400ms'}})]),
    ])
  ]
})
export class ClickGameComponent implements OnInit {

  device = window.innerWidth < 768 ? 'phone' : 'computer';

  pageId = 0;

  public slides = [
    { no: 0, text: `For the next minute, let\'s explore interacting with your ${ this.device } in a new way`, delay: 3000 },
    { no: 1, text: 'We will click the above button just a bit more mindfully', delay: 700 },
    { no: 2, text: 'In fact, we will be a bit cheeky and not let you click until I say so 😏', delay: 1000 },
    { no: 3, text: 'This is important, as we spend most of our time on the computer mindlessly clicking', delay: 500 },
    { no: 4, text: '', delay: 500 },
    { no: 5, text: '', delay: 500 },
    { no: 6, text: 'Thanks for playing', delay: 500 },
  ];

  constructor(){}

  ngOnInit(): void {
  }

  onNextClick() {
    this.pageId++;
    console.log("next clicked, new current slide is: ", this.pageId);
  }

}
