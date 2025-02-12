import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementComponent } from '@src/app/extras/profile/etablissement/etablissement.component';

describe('EtablissementComponent', () => {
  let component: EtablissementComponent;
  let fixture: ComponentFixture<EtablissementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtablissementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
