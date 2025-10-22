import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsNotificationCard5 } from './cs-notification-card5';

describe('CsNotificationCard5', () => {
  let component: CsNotificationCard5;
  let fixture: ComponentFixture<CsNotificationCard5>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsNotificationCard5]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsNotificationCard5);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
