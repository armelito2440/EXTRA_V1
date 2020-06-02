import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionModalComponent } from '@src/app/extras/missions/mission-modal/mission-modal.component';

describe('MissionModalComponent', () => {
  let component: MissionModalComponent;
  let fixture: ComponentFixture<MissionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
