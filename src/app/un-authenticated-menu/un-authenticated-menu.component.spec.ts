import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthenticatedMenuComponent } from './un-authenticated-menu.component';

describe('UnAuthenticatedMenuComponent', () => {
  let component: UnAuthenticatedMenuComponent;
  let fixture: ComponentFixture<UnAuthenticatedMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnAuthenticatedMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnAuthenticatedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
