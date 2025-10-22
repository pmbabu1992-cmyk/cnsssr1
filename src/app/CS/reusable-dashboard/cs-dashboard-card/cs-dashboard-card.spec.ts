import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsDashboardCard } from './cs-dashboard-card';

describe('CsDashboardCard', () => {
  let component: CsDashboardCard;
  let fixture: ComponentFixture<CsDashboardCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsDashboardCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsDashboardCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
