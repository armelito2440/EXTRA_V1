import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
@Component({
  selector: 'app-mission-modal',
  templateUrl: './mission-modal.component.html',
  styleUrls: ['./mission-modal.component.scss']
})
export class MissionModalComponent implements OnInit {
    mission: { id: string,
        intitule: string,
        title: string,
        footer: string,
        headerText: string, footerText: string,
  items: {date: string, lieu: string, duree: string, commentaire: string }}[] = [];
  constructor(private params: ModalDialogParams) { }

  ngOnInit() {
    console.log('modal: ', this.params.context);
    this.mission = this.params.context.mission;
  }
  close() {
    this.params.closeCallback();
  }
}
