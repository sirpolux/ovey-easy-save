import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsGuestComponent } from './transactions-guest.component';

describe('TransactionsGuestComponent', () => {
  let component: TransactionsGuestComponent;
  let fixture: ComponentFixture<TransactionsGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsGuestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionsGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
