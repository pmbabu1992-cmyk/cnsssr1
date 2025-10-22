import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsProfileCard } from './cs-profile-card';

describe('CsProfileCard', () => {
  let component: CsProfileCard;
  let fixture: ComponentFixture<CsProfileCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsProfileCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsProfileCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
