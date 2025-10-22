import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsNotificationCard1 } from './cs-notification-card1';

describe('CsNotificationCard1', () => {
  let component: CsNotificationCard1;
  let fixture: ComponentFixture<CsNotificationCard1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsNotificationCard1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsNotificationCard1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
