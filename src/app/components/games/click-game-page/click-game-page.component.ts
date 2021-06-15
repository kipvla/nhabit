import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-click-game-page',
  templateUrl: './click-game-page.component.html',
  styleUrls: ['./click-game-page.component.scss']
})
export class ClickGamePageComponent implements OnInit {

  @Input() text!:string;
  @Input() delay!:string;
  @Input() id!:string;
  @Input() device!:string;
  @Input() last!:string;

  time = Number(this.delay);

  disabled = true;

  constructor() { }

  ngOnInit(): void {
    const delay = Number(this.delay);
    setTimeout(() => {
      console.log('delayClick called')
      this.disabled = false;
    }, delay)
  }

}
