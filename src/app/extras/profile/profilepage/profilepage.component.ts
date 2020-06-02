import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.scss']
})
export class ProfilepageComponent implements OnInit {
  title = 'Extras V1';

  constructor() { }

  ngOnInit() {
    console.log('Profile Page');
  }

}
