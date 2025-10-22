import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsNotificationCard2 } from './cs-notification-card2';

describe('CsNotificationCard2', () => {
  let component: CsNotificationCard2;
  let fixture: ComponentFixture<CsNotificationCard2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsNotificationCard2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsNotificationCard2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
