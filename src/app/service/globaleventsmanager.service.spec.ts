import { TestBed } from '@angular/core/testing';

import { GlobaleventsmanagerService } from './globaleventsmanager.service';

describe('GlobaleventsmanagerService', () => {
  let service: GlobaleventsmanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobaleventsmanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
