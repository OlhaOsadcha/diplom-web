import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Observable, Subscription } from 'rxjs';
import { ShellService } from 'components';
import { TextComponent } from '../../text/text.component';

@Component({
  selector: 'lib-header',
  templateUrl: 'header.component.html',
  styleUrl: 'header.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatIconButton,
    AsyncPipe,
    MatIcon,
    TextComponent,
    NgTemplateOutlet,
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private menuIconClickHandler: (() => void) | undefined;
  private subscription: Subscription = new Subscription();
  constructor(private shellService: ShellService) {}

  public ngOnInit(): void {
    this.subscription.add(
      this.shellService.menuIconClickHandler$.subscribe({
        next: clickHandler => (this.menuIconClickHandler = clickHandler),
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public get actionBarTemplate$(): Observable<TemplateRef<any> | null> {
    return this.shellService.actionBarTemplate$;
  }

  public get headerTitle$(): Observable<string> {
    return this.shellService.headerTitle$;
  }

  public get menuIcon$(): Observable<string> {
    return this.shellService.menuIcon$;
  }

  public get showActionBar$(): Observable<boolean> {
    return this.shellService.showActionBar$;
  }

  public onMenuIconClick(): void {
    if (this.menuIconClickHandler) {
      this.menuIconClickHandler();
    }
  }
}
