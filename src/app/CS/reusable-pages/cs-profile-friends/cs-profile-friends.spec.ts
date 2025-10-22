import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsProfileFriends } from './cs-profile-friends';

describe('CsProfileFriends', () => {
  let component: CsProfileFriends;
  let fixture: ComponentFixture<CsProfileFriends>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsProfileFriends]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsProfileFriends);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
