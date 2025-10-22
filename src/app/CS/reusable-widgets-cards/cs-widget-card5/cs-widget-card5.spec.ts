import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsWidgetCard5 } from './cs-widget-card5';

describe('CsWidgetCard5', () => {
  let component: CsWidgetCard5;
  let fixture: ComponentFixture<CsWidgetCard5>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsWidgetCard5]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsWidgetCard5);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
