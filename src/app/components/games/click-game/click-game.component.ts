import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import {slider} from '../../../animations/animation';

@Component({
  selector: 'app-click-game',
  templateUrl: './click-game.component.html',
  styleUrls: ['./click-game.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ClickGameComponent implements OnInit {

  device = window.innerWidth < 768 ? 'phone' : 'computer';

  pageId = 0;

  public slides = [
    { src: 0 },
    { src: 1 },
    { src: 2 },
    { src: 3 },
    { src: 4 }
  ];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) { 
    this.pageId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    // activatedRoute.params.subscribe(val => {
    //   this.router.navigate([`/game/click/${this.pageId}`]);
    // })
  }

  ngOnInit(): void {
  }

  // nextPage(): void {
  //   this.pageId++;
  //   console.log(this.pageId);
  //   this.router.navigate([`/game/click/${this.pageId}`]);
  // }

  onNextClick() {
    const next = this.pageId + 1;
    this.pageId = next;
    console.log("next clicked, new current slide is: ", this.pageId);
  }

}
