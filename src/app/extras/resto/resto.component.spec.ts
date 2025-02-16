import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoComponent } from '@src/app/extras/resto/resto.component';

describe('RestoComponent', () => {
  let component: RestoComponent;
  let fixture: ComponentFixture<RestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
