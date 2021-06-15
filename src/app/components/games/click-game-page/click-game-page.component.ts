import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-click-game-page',
  templateUrl: './click-game-page.component.html',
  styleUrls: ['./click-game-page.component.scss']
})
export class ClickGamePageComponent implements OnInit {

  @Input() id!:string; 
  constructor() { }

  ngOnInit(): void {
  }

}
