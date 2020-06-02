import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  title = 'Extras V1';

  constructor(
      private router: RouterExtensions,
      private active: ActivatedRoute,
      private page: Page
      ) { }

  ngOnInit() {
    console.log('tabs component');
    this.loadTabRoutes();
    this.page.actionBarHidden = true;
  }
  private loadTabRoutes() {
    console.log('loadTabRoutes', this.active);
    setTimeout(() => {
      this.router.navigate(
        [
          {
            outlets: {
              location: ['location'],
              profile: ['profile']
            }
          }
        ],
        {
          relativeTo: this.active
        }
      );
    }, 10);
  }
}
