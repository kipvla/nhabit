import { trigger, transition, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import {fadeIn, fadeOut} from '../../../animations/animation';

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
export class ClickGameComponent {

  device = window.innerWidth < 768 ? 'phone' : 'computer';

  slideNo = 0;

  isAddingObservation = false;

  public slides = [
    { text: `For the next couple minutes, let\'s explore interacting with your ${ this.device } in a new way`, delay: 3000, hidingBtn: null },
    { text: 'We will practice clicking the above button just a bit more mindfully', delay: 700, hidingBtn: null },
    { text: '(Practice click)', delay: 700, hidingBtn: null },
    { text: '(Practice click #2)', delay: 700, hidingBtn: null },
    { text: 'Hey, you\'re pretty good at this!', delay: 1000, hidingBtn: null, btnText: 'Of course I am 😒' },
    { text: 'But I did say mindfully, not mindlessly, no? 😏', delay: 6000, hidingBtn: true },
    { text: 'What was it like when the button wasn\'t there?', delay: 1000, hidingBtn: null },
    { text: 'If you\'re anything like me, you\'ve likely already done plenty of mindless clicking today', delay: 500, hidingBtn: null },
    { text: 'Websites are rarely as rude as I was just now...', delay: 500, hidingBtn: null },
    { text: '...hiding the button they want you to click', delay: 500, hidingBtn: null },
    { text: 'But that doesn\'t mean we have to be automatic clicking robots', delay: 500, hidingBtn: null },
    { text: 'So what if for just a short time, let\'s see if we can\'t do it with a little more care', delay: 500, hidingBtn: null },
    { text: 'Let\'s try it', delay: 500, hidingBtn: null },
    { text: 'First, where are you looking?', delay: 5000, hidingBtn: null },
    { text: 'Are you aware of the size of the room or space you\'re in?', delay: 5000, hidingBtn: null },
    { text: 'Can you soften your eyes before you click again?', delay: 5000, hidingBtn: null },
    { text: 'Can you feel the size of the room before you click again?', delay: 5000, hidingBtn: null },
    { text: 'The space around you...', delay: 5000, hidingBtn: null },
    { text: '...above you...', delay: 5000, hidingBtn: null },
    { text: '...under you', delay: 5000, hidingBtn: null },
    { text: 'Are you leaning into the screen?', delay: 2000, hidingBtn: null },
    { text: 'If you are, is it necessary?', delay: 5000, hidingBtn: null },
    { text: 'Now, simply imagine yourself clicking. What do you notice?', delay: 5000, hidingBtn: true },
    { text: 'Again, can you soften your eyes? Feel the space around you?', delay: 5000, hidingBtn: true },
    { text: 'There is no \'right\' or \'wrong\' way to click', delay: 5000, hidingBtn: true },
    { text: 'But I do think we can always find better ways of doing so', delay: 5000, hidingBtn: true },
    { text: 'That\'s all. Thanks for playing, come back soon!', delay: 500, hidingBtn: null },
    { text: '', delay: 500, hidingBtn: null },
  ];

  constructor(){}

  onNextClick() {
    this.slideNo++;
  }

  toggleAddObservation() {
    this.isAddingObservation = !this.isAddingObservation;
  }

}
