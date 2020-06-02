import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsEtabComponent } from '@src/app/extras/profile/tabs-etab/tabs-etab.component';

describe('TabsEtabComponent', () => {
  let component: TabsEtabComponent;
  let fixture: ComponentFixture<TabsEtabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsEtabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsEtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
