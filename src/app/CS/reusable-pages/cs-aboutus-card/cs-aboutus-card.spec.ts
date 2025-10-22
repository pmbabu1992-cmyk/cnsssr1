import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsAboutusCard } from './cs-aboutus-card';

describe('CsAboutusCard', () => {
  let component: CsAboutusCard;
  let fixture: ComponentFixture<CsAboutusCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsAboutusCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsAboutusCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
