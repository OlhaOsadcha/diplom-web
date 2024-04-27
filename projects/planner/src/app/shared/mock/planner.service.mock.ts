import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { MetadataModel } from '../models/metadata.model';
import { PlannerService } from '../services/planner.service';
import { IncomeModel } from '../models/income.model';
import { v4 as uuid4 } from 'uuid';
import { LivingCostModel } from '../models/living-cost.model';

// const timeout = 2000;

@Injectable()
export class PlannerServiceMock extends PlannerService {
  private readonly timeout = 2000;
  private incomes: IncomeModel[] = [];
  private livingCosts: LivingCostModel[] = [];

  constructor() {
    super({} as HttpClient);
  }

  public override getMetadata(): Observable<MetadataModel> {
    const incomeTotalBaseline = this.incomes.find(i => i.isBaseline)?.total;
    const livingCostTotalBaseline = this.livingCosts.find(c => c.isBaseline)?.total;

    return of({
      income: incomeTotalBaseline,
      costOfLiving: livingCostTotalBaseline,
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

  public override getLivingCost(): Observable<LivingCostModel[]> {
    return of(this.livingCosts).pipe(delay(this.timeout));
  }

  public override createLivingCost(livingCost: LivingCostModel): Observable<LivingCostModel[]> {
    const newLivingCost = this.livingCosts.length
      ? livingCost
      : { ...livingCost, isBaseline: true };
    this.livingCosts = [...this.livingCosts, { ...newLivingCost, id: uuid4() }];
    return of(this.livingCosts).pipe(delay(this.timeout));
  }

  public override updateLivingCost(livingCost: LivingCostModel): Observable<LivingCostModel[]> {
    this.livingCosts = this.livingCosts.map(c => {
      if (c.id === livingCost.id) {
        return { ...c, ...livingCost };
      }
      return c;
    });

    return of(this.livingCosts).pipe(delay(this.timeout));
  }

  public override deleteLivingCost(id: string): Observable<LivingCostModel[]> {
    this.livingCosts = this.livingCosts.filter(c => c.id !== id);
    return of(this.livingCosts).pipe(delay(this.timeout));
  }

  public override setBaselineLivingCost(id: string): Observable<LivingCostModel[]> {
    const baseline = this.livingCosts
      .filter(c => c.id === id)
      .map(c => {
        return { ...c, isBaseline: true };
      });
    const temp = this.livingCosts
      .filter(c => c.id !== id)
      .map(c => {
        return { ...c, isBaseline: false };
      });
    this.livingCosts = [...baseline, ...temp];

    return of(this.livingCosts).pipe(delay(this.timeout));
  }
}
