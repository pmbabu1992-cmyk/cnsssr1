import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsAboutusCard1 } from './cs-aboutus-card1';

describe('CsAboutusCard1', () => {
  let component: CsAboutusCard1;
  let fixture: ComponentFixture<CsAboutusCard1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsAboutusCard1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsAboutusCard1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
