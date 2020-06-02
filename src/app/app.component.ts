import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from './helpers/routing.service';
import { AuthService } from './extras/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {


  constructor(private router: RoutingService,
              public auth: AuthService) {
      // Use the component constructor to inject services.
  }
  onProfile() {
  
      this.router.replace(['/profile'], true);
  }
}
