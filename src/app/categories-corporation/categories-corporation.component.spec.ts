import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesCorporationComponent } from '@src/app/categories-corporation/categories-corporation.component';

describe('CategoriesCorporationComponent', () => {
  let component: CategoriesCorporationComponent;
  let fixture: ComponentFixture<CategoriesCorporationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesCorporationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesCorporationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
