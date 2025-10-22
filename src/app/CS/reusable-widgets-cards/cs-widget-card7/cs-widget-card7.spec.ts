import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsWidgetCard7 } from './cs-widget-card7';

describe('CsWidgetCard7', () => {
  let component: CsWidgetCard7;
  let fixture: ComponentFixture<CsWidgetCard7>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsWidgetCard7]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsWidgetCard7);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
