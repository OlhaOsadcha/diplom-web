import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HeaderConfig } from './shell.model';

@Injectable({
  providedIn: 'root',
})
export class ShellService {
  private headerTitle$$: Subject<string> = new BehaviorSubject('');
  private menuIcon$$: Subject<string> = new BehaviorSubject('');
  private menuIconClickHandler$$: Subject<(() => void) | undefined> = new Subject();
  private showActionBar$$: Subject<boolean> = new BehaviorSubject(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private actionBarTemplate$$: Subject<TemplateRef<any> | null> = // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new BehaviorSubject<TemplateRef<any> | null>(null);

  public headerTitle$: Observable<string> = this.headerTitle$$;
  public menuIcon$: Observable<string> = this.menuIcon$$;
  public menuIconClickHandler$: Observable<(() => void) | undefined> = this.menuIconClickHandler$$;
  public showActionBar$: Observable<boolean> = this.showActionBar$$;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public actionBarTemplate$: Observable<TemplateRef<any> | null> = this.actionBarTemplate$$;

  constructor() {}

  public set headerConfig(config: HeaderConfig) {
    this.actionBarTemplate = config.actionBarTemplate ?? null;
    this.headerTitle = config.headerTitle ? config.headerTitle : '';
    this.menuIcon = config.menuIcon ? config.menuIcon : '';
    this.menuIconClickHandler = config.menuIconClickHandler || undefined;
    this.showActionBar = config.showActionBar !== undefined ? config.showActionBar : true;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public set actionBarTemplate(template: TemplateRef<any> | null) {
    this.actionBarTemplate$$.next(template);
  }

  public set headerTitle(icon: string) {
    this.headerTitle$$.next(icon);
  }

  public set menuIcon(icon: string) {
    this.menuIcon$$.next(icon);
  }

  public set menuIconClickHandler(clickHandler: (() => void) | undefined) {
    this.menuIconClickHandler$$.next(clickHandler);
  }

  public set showActionBar(show: boolean) {
    this.showActionBar$$.next(show);
  }
}
