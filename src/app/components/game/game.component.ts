import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  title: string | null;

  constructor(private activatedRoute: ActivatedRoute) { 
    this.title = this.activatedRoute.snapshot.paramMap.get('title');
  }

  ngOnInit(): void {
  }

}
