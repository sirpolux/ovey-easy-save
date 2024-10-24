import { TestBed } from '@angular/core/testing';

import { StandardMenuService } from './standard-menu.service';

describe('StandardMenuService', () => {
  let service: StandardMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
