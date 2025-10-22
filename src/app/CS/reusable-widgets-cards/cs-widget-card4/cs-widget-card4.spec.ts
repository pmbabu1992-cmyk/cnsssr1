import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsWidgetCard4 } from './cs-widget-card4';

describe('CsWidgetCard4', () => {
  let component: CsWidgetCard4;
  let fixture: ComponentFixture<CsWidgetCard4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsWidgetCard4]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsWidgetCard4);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
