import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { MetadataModel } from '../models/metadata.model';
import { PlannerService } from '../services/planner.service';
import { IncomeModel } from '../models/income.model';
import { v4 as uuid4 } from 'uuid';

// const timeout = 2000;

@Injectable()
export class PlannerServiceMock extends PlannerService {
  private readonly timeout = 2000;
  private incomes: IncomeModel[] = [];

  constructor() {
    super({} as HttpClient);
  }

  public override getMetadata(): Observable<MetadataModel> {
    const incomeTotalBaseline = this.incomes.find(i => i.isBaseline)?.total;

    return of({
      income: incomeTotalBaseline,
      costOfLiving: '60000',
    }).pipe(delay(this.timeout));
  }

  public override getIncome(): Observable<IncomeModel[]> {
    return of(this.incomes).pipe(delay(this.timeout));
  }

  public override createIncome(income: IncomeModel): Observable<IncomeModel[]> {
    const newIncome = this.incomes.length ? income : { ...income, isBaseline: true };
    this.incomes = [...this.incomes, { ...newIncome, id: uuid4() }];
    return of(this.incomes).pipe(delay(this.timeout));
  }

  public override updateIncome(income: IncomeModel): Observable<IncomeModel[]> {
    this.incomes = this.incomes.map(i => {
      if (i.id === income.id) {
        return { ...i, ...income };
      }
      return i;
    });

    return of(this.incomes).pipe(delay(this.timeout));
  }

  public override deleteIncome(id: string): Observable<IncomeModel[]> {
    this.incomes = this.incomes.filter(i => i.id !== id);
    return of(this.incomes).pipe(delay(this.timeout));
  }

  public override setBaselineIncome(id: string): Observable<IncomeModel[]> {
    const baseline = this.incomes
      .filter(i => i.id === id)
      .map(i => {
        return { ...i, isBaseline: true };
      });
    const temp = this.incomes
      .filter(i => i.id !== id)
      .map(i => {
        return { ...i, isBaseline: false };
      });
    this.incomes = [...baseline, ...temp];

    return of(this.incomes).pipe(delay(this.timeout));
  }
}
