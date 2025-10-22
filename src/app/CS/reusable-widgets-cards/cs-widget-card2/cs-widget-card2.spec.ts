import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsWidgetCard2 } from './cs-widget-card2';

describe('CsWidgetCard2', () => {
  let component: CsWidgetCard2;
  let fixture: ComponentFixture<CsWidgetCard2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsWidgetCard2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsWidgetCard2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
