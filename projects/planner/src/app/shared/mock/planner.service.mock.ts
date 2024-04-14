import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { MetadataModel } from '../models/metadata.model';
import { PlannerService } from '../services/planner.service';

const timeout = 2000;

@Injectable()
export class PlannerServiceMock extends PlannerService {
  constructor() {
    super({} as HttpClient);
  }

  public override getMetadata(): Observable<MetadataModel> {
    return of({
      income: '80k EUR',
      costOfLiving: '60k EUR',
    }).pipe(delay(timeout));
  }
}
