import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(private router: Router) { }

  Navigate(navItemRoute: string): void {
    this.router.navigate([navItemRoute]
    );
}
}
