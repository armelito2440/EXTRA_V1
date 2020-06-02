import { Component, OnInit, NgModule } from '@angular/core';
import { HttpServiceService } from '@src/app/helpers/http-service.service';
import { RoutingService } from '@src/app/helpers/routing.service';

import {MatExpansionModule} from '@angular/material/expansion';
import { RadListView, ListViewEventData } from 'nativescript-ui-listview';
import { NavService } from '@src/app/helpers/nav.service';
import { MissionsComponent } from '../missions/missions.component';
import { AppComponent } from '@src/app/app.component.tns';
import { idProperty } from 'tns-core-modules/ui/page/page';
import { MissionsService } from '@src/app/helpers/missions.service';

// import { isIOS, isAndroid } from 'tns-core-modules/platform';

declare var UIView, NSMutableArray, NSIndexPath;



@Component({
  selector: 'app-resto',
  templateUrl: './resto.component.html',
  styleUrls: ['./resto.component.scss']
})
export class RestoComponent implements OnInit {
title = 'Etablissement test';
subtitle = 'Liste des missions concernant votre établissement';

missions: { id: string,
  intitule: string,
  title: string,
  footer: string,
  headerText: string, footerText: string,
items: {date: string, lieu: string, duree: string, commentaire: string }}[] = []
    

selectedIndexes = [0, 3];
  constructor(
    private http: HttpServiceService,
    private router: RoutingService,
    private mission :MissionsService,
    private nav: NavService) { }
    
  

  ngOnInit() {
    this.missions = this.mission.getMissions();

  //  this.http.getHello();
  //  this.http.getMe();
  console.log('resto OnInit');
    this.http.getEtablissement().subscribe(etab => {
      console.log('resto getEtablissement', etab);
    });

  }
  onTestRefresh() {
    this.router.replace(['/extra'], false);
  }
  onDelete(id: string) {
    console.log('onDelete');
  }
  onEdit(missions: { id: string, date: string, lieu: string, duree: string, commentaire: string }
    
    ) 
    
    {
    console.log('onEdit');
  }
  onValidate(id: string) {
    console.log('onValidate');
  }
  onSubmit() {
    alert('POMME');
  }
  templateSelector(item: any, index: number, items: any): string {
    return item.expanded ? 'expanded' : 'default';
  }
  onClickNew(route: string) {
    this.nav.Navigate(route);
  }
  isLoading() {}
}
