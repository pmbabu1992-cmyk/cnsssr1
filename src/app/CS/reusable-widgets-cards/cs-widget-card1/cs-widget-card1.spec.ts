import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsWidgetCard1 } from './cs-widget-card1';

describe('CsWidgetCard1', () => {
  let component: CsWidgetCard1;
  let fixture: ComponentFixture<CsWidgetCard1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsWidgetCard1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsWidgetCard1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
