import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsWidgetCard3 } from './cs-widget-card3';

describe('CsWidgetCard3', () => {
  let component: CsWidgetCard3;
  let fixture: ComponentFixture<CsWidgetCard3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsWidgetCard3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsWidgetCard3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
