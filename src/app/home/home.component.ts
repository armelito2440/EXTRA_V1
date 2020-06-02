import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../helpers/routing.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  titleExtra = 'EXTRA';
  

  constructor(
    private router: RoutingService
  ) { }

  ngOnInit() {
  }
  onSubmit() {
    console.log('on est là');
    this.router.replace(['/auth'], false);
  }
  
}


