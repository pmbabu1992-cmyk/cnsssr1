import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsLandingCard1 } from './cs-landing-card1';

describe('CsLandingCard1', () => {
  let component: CsLandingCard1;
  let fixture: ComponentFixture<CsLandingCard1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsLandingCard1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsLandingCard1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
