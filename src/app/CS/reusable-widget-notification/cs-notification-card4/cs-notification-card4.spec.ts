import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsNotificationCard4 } from './cs-notification-card4';

describe('CsNotificationCard4', () => {
  let component: CsNotificationCard4;
  let fixture: ComponentFixture<CsNotificationCard4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsNotificationCard4]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsNotificationCard4);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
