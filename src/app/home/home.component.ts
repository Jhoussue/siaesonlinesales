import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  logo = 'assets/alma3.jpg';
  logo2 = 'assets/alma1.jpg';
  logo3 = 'assets/alma.png';
  constructor() { }

  ngOnInit(): void {
  }

}
