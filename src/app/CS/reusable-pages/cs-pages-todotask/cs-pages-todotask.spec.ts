import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsPagesTodotask } from './cs-pages-todotask';

describe('CsPagesTodotask', () => {
  let component: CsPagesTodotask;
  let fixture: ComponentFixture<CsPagesTodotask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsPagesTodotask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsPagesTodotask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
