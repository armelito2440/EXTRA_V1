import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilepageComponent } from '@src/app/extras/profile/profilepage/profilepage.component';

describe('ProfilepageComponent', () => {
  let component: ProfilepageComponent;
  let fixture: ComponentFixture<ProfilepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
