import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephonComponent } from '@src/app/extras/telephon/telephon.component';

describe('TelephonComponent', () => {
  let component: TelephonComponent;
  let fixture: ComponentFixture<TelephonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelephonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelephonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
