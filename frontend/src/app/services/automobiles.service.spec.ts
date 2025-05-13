import { TestBed } from '@angular/core/testing';

import { AutomobilesService } from './automobiles.service';

describe('AutomobilesService', () => {
  let service: AutomobilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutomobilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
