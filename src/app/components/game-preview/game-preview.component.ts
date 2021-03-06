import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrls: ['./game-preview.component.scss']
})
export class GamePreviewComponent {

  @Input()
  title!: string;

  constructor() { }

}
