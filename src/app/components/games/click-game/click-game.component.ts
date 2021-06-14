import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-click-game',
  templateUrl: './click-game.component.html',
  styleUrls: ['./click-game.component.scss']
})
export class ClickGameComponent implements OnInit {

  device = window.innerWidth < 768 ? 'phone' : 'computer';

  pageId = 0;

  constructor(private activatedRoute: ActivatedRoute) { 
    this.pageId = Number(this.activatedRoute.snapshot.paramMap.get('title'));
  }

  ngOnInit(): void {
  }

}
