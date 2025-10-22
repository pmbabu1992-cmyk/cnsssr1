import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsLandingCard2 } from './cs-landing-card2';

describe('CsLandingCard2', () => {
  let component: CsLandingCard2;
  let fixture: ComponentFixture<CsLandingCard2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsLandingCard2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsLandingCard2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
