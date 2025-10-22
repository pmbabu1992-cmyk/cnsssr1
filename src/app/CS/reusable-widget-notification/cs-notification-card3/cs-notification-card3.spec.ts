import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsNotificationCard3 } from './cs-notification-card3';

describe('CsNotificationCard3', () => {
  let component: CsNotificationCard3;
  let fixture: ComponentFixture<CsNotificationCard3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsNotificationCard3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsNotificationCard3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
