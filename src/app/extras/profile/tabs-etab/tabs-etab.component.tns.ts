import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'app-tabs-etab',
  templateUrl: './tabs-etab.component.html',
  styleUrls: ['./tabs-etab.component.scss']
})
export class TabsEtabComponent implements OnInit {
title = "Extras - Etablissements"
  constructor(
    private router: RouterExtensions,
    private active: ActivatedRoute,
    private page: Page
  ) { }

  ngOnInit() {
    console.log('tabsEtab component');
    this.loadTabRoutes();
    this.page.actionBarHidden = true;
  }

  private loadTabRoutes() {
    console.log('loadTabEtabRoutes', this.active);
    setTimeout(() => {
      this.router.navigate(
        [
          {
            outlets: {
              location: ['location'],
              adresse: ['adresse'],
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