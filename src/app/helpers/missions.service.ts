import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {

  constructor() { }

  missions: { id: string,
    intitule: string,
    title: string,
    footer: string,
    headerText: string, footerText: string,
items: {date: string, lieu: string, duree: string, commentaire: string }}[] = [
{ id: '0', intitule: 'Ref:275', title: '1', footer: '10', headerText: 'First', footerText: '4',
items: {date: '2/05/2019', lieu: 'Bordeaux', duree: '5h', commentaire: 'Mission 1 - Demande Extra Salle' }},
{ id: '1', intitule: 'Ref:276', title: '2', footer: '10', headerText: 'Second', footerText: '4',
items: {date: '20/07/2019', lieu: 'Capbreton', duree: '3h30', commentaire: 'Mission 2 - Demande Extra Bar' }},
{ id: '2', intitule: 'Ref:277', title: '3', footer: '10', headerText: 'Third', footerText: '4',
items: {date: '24/09/2019', lieu: 'Biarritz', duree: '6h15', commentaire: 'Mission 3 - Demande Extra Cuisine' }},
{ id: '3', intitule: 'Ref:278', title: '4', footer: '10', headerText: 'Fourth', footerText: '4',
items: {date: '24/09/2019', lieu: 'Hossegor', duree: '4h45', commentaire: 'Mission 4 - Demande Extra Traiteur' }}
];

getMissions() {
  return this.missions;
}
}
