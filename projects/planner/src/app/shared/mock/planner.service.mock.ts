import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { MetadataModel } from '../models/metadata.model';
import { PlannerService } from '../services/planner.service';
import { IncomeModel } from '../models/income.model';

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

  public override getIncome(): Observable<IncomeModel[]> {
    return of([
      {
        id: '1',
        total: '80000',
      },
      {
        id: '2',
        total: '75000',
      },
    ]).pipe(delay(timeout));
  }
}
