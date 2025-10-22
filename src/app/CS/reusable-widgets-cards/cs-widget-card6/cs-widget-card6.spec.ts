import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsWidgetCard6 } from './cs-widget-card6';

describe('CsWidgetCard6', () => {
  let component: CsWidgetCard6;
  let fixture: ComponentFixture<CsWidgetCard6>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsWidgetCard6]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsWidgetCard6);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
