import { Component, OnInit, Input } from '@angular/core';
import { MissionsService } from '@src/app/helpers/missions.service';


@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {

  @Input() missions: any = [];
  title = 'Missions';
  constructor(private missionsService: MissionsService) { }

  ngOnInit() {
    this.missions = this.missionsService.getMissions();
  }


}
