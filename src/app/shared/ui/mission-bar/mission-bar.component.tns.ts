import { Component, OnInit } from '@angular/core';
import { isAndroid } from 'tns-core-modules/platform';

@Component({
  selector: 'app-mission-bar',
  templateUrl: './mission-bar.component.html',
  styleUrls: ['./mission-bar.component.scss']
})
export class MissionBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onLoadedActionBar() {
    console.log('onLoadedMissionBar');
/*     if (isAndroid) {
      const androidToolbar = this.page.actionBar.nativeView;
      const backButton = androidToolbar.getNavigationIcon();
      let color = '#171717';
      if (this.hasMenu) {
        color = '#ffffff';
      }
      if (backButton) {
        backButton.setColorFilter(
          android.graphics.Color.parseColor(color),
          (<any>android.graphics).PorterDuff.Mode.SRC_ATOP
        );
      }
    } */
  }
  onToggleMission() {
    console.log('onToggleMission');
//    this.uiService.toggleDrawer();
  }
}
