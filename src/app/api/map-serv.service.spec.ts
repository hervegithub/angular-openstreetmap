import { TestBed } from '@angular/core/testing';

import { MapServService } from './map-serv.service';

describe('MapServService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapServService = TestBed.get(MapServService);
    expect(service).toBeTruthy();
  });
});
