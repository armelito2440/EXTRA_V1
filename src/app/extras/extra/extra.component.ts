import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '@src/app/helpers/http-service.service';
import {MatExpansionModule} from '@angular/material/expansion';
import { MissionsService } from '@src/app/helpers/missions.service';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.scss']
})
export class ExtraComponent implements OnInit {
  title = 'EXTRA';
  subtitle = 'Ici, on parle de mission !';
  cheminImage: any = '../../assets/images/2serveurs.png';
  userId : {userId: any};

  missions: { id: string,
    intitule: string,
    title: string,
    footer: string,
    headerText: string, 
    footerText: string,
    
items: {date: string, lieu: string, duree: string, commentaire: string }}[] = []

  constructor(
    private http: HttpServiceService,
    private mission :MissionsService
    
  ) { }

  ngOnInit() {
    console.log('extra');
    this.missions = this.mission.getMissions();
  }
  
  onSubmit() {
    console.log('Bien joué !')
  }

  isLoading() {}
}
