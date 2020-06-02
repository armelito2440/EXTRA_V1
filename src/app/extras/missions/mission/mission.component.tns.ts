import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, AfterViewInit, ViewContainerRef } from '@angular/core';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { isAndroid } from 'tns-core-modules/platform';
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { MissionModalComponent } from '../mission-modal/mission-modal.component';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit, AfterViewInit {
    @Input() mission: any;
//    @ViewChild(RadSideDrawerComponent, {static: true}) drawerComponent: RadSideDrawerComponent;
//    @ViewChild('mission', {static: true}) drawerComponent: RadSideDrawerComponent;

//    @ViewChild(RadSideDrawerComponent, {static: true}) drawerComponent: RadSideDrawerComponent;
//    private _drawer: RadSideDrawer;
  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef
    ) { }

  ngOnInit() {
  //    console.log('ngOnInit - mission');
  }
  ngAfterViewInit() {
    console.log('mission component: ');
/*     if (isAndroid) {
      console.log('mission component: is Android');
      this._drawer = this.drawerComponent.sideDrawer;

      this.changeDetectionRef.detectChanges();      
    } else {
      console.log('mission component is not android');
      console.log('mission component drawerComponent: ', this.drawerComponent);
    }
 */}
  onToggleMission() {
    console.log('onToggleMission - mission');
/*     if (this._drawer) {
      console.log('onToggleMission - toggle drawer');
      if (isAndroid) {
        this._drawer.toggleDrawerState();
      }
     }
*/
//    this.uiService.toggleDrawer();
  }
  showModal() {
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: true,
      context: {mission: this.mission}
    };
    this.modalService.showModal(MissionModalComponent, options);
  }
  get android() {
    console.log('get android is ', isAndroid);
    return isAndroid;
  }
  get title () {
      return this.mission.title;
  }
  get intitule () {
      return this.mission.intitule;
  }
}
