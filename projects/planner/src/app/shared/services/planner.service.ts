import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { v4 as uuid4 } from 'uuid';
import { environment } from '../../../environments/environment';
import { MetadataModel } from '../models/metadata.model';
import { IncomeModel } from '../models/income.model';
import { LivingCostModel } from '../models/living-cost.model';

@Injectable()
export class PlannerService {
  private getUrl = (route: string) => Location.joinWithSlash(environment.apiEndpoint || '', route);
  private requestOptions = (params: Params = {}) => {
    let headers: HttpHeaders = new HttpHeaders({
      'X-Conversation-ID': uuid4(),
      'X-Correlation-ID': uuid4(),
      'X-Request-ID': uuid4(),
    });

    headers = headers.append('Content-Type', 'application/json');

    return { headers, params };
  };

  constructor(private http: HttpClient) {}

  public getMetadata(): Observable<MetadataModel> {
    return this.http.get(this.getUrl('metadata'), this.requestOptions());
  }

  public getIncome(): Observable<IncomeModel[]> {
    return this.http.get(this.getUrl('income'), this.requestOptions()) as Observable<IncomeModel[]>;
  }

  public createIncome(income: IncomeModel): Observable<IncomeModel[]> {
    return this.http.post(this.getUrl('income'), income, this.requestOptions()) as Observable<
      IncomeModel[]
    >;
  }

  public updateIncome(income: IncomeModel): Observable<IncomeModel[]> {
    return this.http.put(
      this.getUrl(`income/${income.id}`),
      income,
      this.requestOptions()
    ) as Observable<IncomeModel[]>;
  }

  public deleteIncome(id: string): Observable<IncomeModel[]> {
    return this.http.delete(this.getUrl(`income/${id}`), this.requestOptions()) as Observable<
      IncomeModel[]
    >;
  }

  public setBaselineIncome(id: string): Observable<IncomeModel[]> {
    return this.http.patch(
      this.getUrl(`income/${id}/baseline`),
      this.requestOptions()
    ) as Observable<IncomeModel[]>;
  }

  public getLivingCost(): Observable<LivingCostModel[]> {
    return this.http.get(this.getUrl('livingcost'), this.requestOptions()) as Observable<
      LivingCostModel[]
    >;
  }

  public createLivingCost(livingCost: LivingCostModel): Observable<LivingCostModel[]> {
    return this.http.post(
      this.getUrl('livingcost'),
      livingCost,
      this.requestOptions()
    ) as Observable<LivingCostModel[]>;
  }

  public updateLivingCost(livingCost: LivingCostModel): Observable<LivingCostModel[]> {
    return this.http.put(
      this.getUrl(`livingcost/${livingCost.id}`),
      livingCost,
      this.requestOptions()
    ) as Observable<LivingCostModel[]>;
  }

  public deleteLivingCost(id: string): Observable<LivingCostModel[]> {
    return this.http.delete(this.getUrl(`livingcost/${id}`), this.requestOptions()) as Observable<
      LivingCostModel[]
    >;
  }

  public setBaselineLivingCost(id: string): Observable<LivingCostModel[]> {
    return this.http.patch(
      this.getUrl(`livingcost/${id}/baseline`),
      this.requestOptions()
    ) as Observable<LivingCostModel[]>;
  }
}
