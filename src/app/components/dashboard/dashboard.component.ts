import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboardtwo',
  templateUrl: './dashboardtwo.component.html',
  styleUrls: ['./dashboardtwo.component.scss']
})
export class DashboardComponent implements OnInit {

  isSignedIn = false;

  isWorking = true;

  constructor() { }

  ngOnInit(): void {
    console.log(localStorage.getItem('user'));
    if (localStorage.getItem('user')) this.isSignedIn = true;
    else this.isSignedIn = false;
  }

}
