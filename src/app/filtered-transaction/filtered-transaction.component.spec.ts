import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredTransactionComponent } from './filtered-transaction.component';

describe('FilteredTransactionComponent', () => {
  let component: FilteredTransactionComponent;
  let fixture: ComponentFixture<FilteredTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteredTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilteredTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
