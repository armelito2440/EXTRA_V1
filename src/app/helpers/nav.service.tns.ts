
import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(private routerExtensions:RouterExtensions) { }

  Navigate(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
        transition: {
            name: 'fade'
        }
    });
}

}