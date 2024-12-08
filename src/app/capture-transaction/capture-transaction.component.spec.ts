import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureTransactionComponent } from './capture-transaction.component';

describe('CaptureTransactionComponent', () => {
  let component: CaptureTransactionComponent;
  let fixture: ComponentFixture<CaptureTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptureTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaptureTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
