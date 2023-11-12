import { TestBed } from '@angular/core/testing';

import { ToggleScreenService } from './toggle-screen.service';

describe('ToggleScreenService', () => {
  let service: ToggleScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
