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
  private incomes: IncomeModel[] = [
    {
      id: '1',
      isBaseline: true,
      total: '80000',
      salary: '20000',
      pension: '',
      deposit: '',
      other: '',
      hasSpouse: true,
      salarySpouse: '60000',
      pensionSpouse: '',
      depositSpouse: '',
      otherSpouse: '',
    },
    {
      id: '2',
      total: '75000',
      salary: '20000',
      pension: '',
      deposit: '55000',
      other: '',
      hasSpouse: false,
      salarySpouse: '',
      pensionSpouse: '',
      depositSpouse: '',
      otherSpouse: '',
    },
  ];

  constructor() {
    super({} as HttpClient);
  }

  public override getMetadata(): Observable<MetadataModel> {
    return of({
      income: '80k EUR',
      costOfLiving: '60k EUR',
    }).pipe(delay(this.timeout));
  }

  public override getIncome(): Observable<IncomeModel[]> {
    return of(this.incomes).pipe(delay(this.timeout));
  }

  public override createIncome(income: IncomeModel): Observable<IncomeModel[]> {
    this.incomes = [...this.incomes, { ...income, id: uuid4() }];
    return of(this.incomes).pipe(delay(this.timeout));
  }

  public override deleteIncome(id: string): Observable<IncomeModel[]> {
    this.incomes = this.incomes.filter(i => i.id !== id);
    return of(this.incomes).pipe(delay(this.timeout));
  }
}
