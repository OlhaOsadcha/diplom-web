import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { v4 as uuid4 } from 'uuid';
import { environment } from '../../../environments/environment';
import { MetadataModel } from '../models/metadata.model';
import { IncomeModel } from '../models/income.model';

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
}
