import { Component, TemplateRef } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { ShellService } from 'components';
import { Observable } from 'rxjs';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { TextComponent } from '../../text/text.component';

@Component({
  selector: 'app-header',
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
export class HeaderComponent {
  constructor(private shellService: ShellService) {}

  public get headerTitle$(): Observable<string> {
    return this.shellService.headerTitle$;
  }

  public get menuIcon$(): Observable<string> {
    return this.shellService.menuIcon$;
  }

  public get showActionBar$(): Observable<boolean> {
    return this.shellService.showActionBar$;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public get actionBarTemplate$(): Observable<TemplateRef<any> | null> {
    return this.shellService.actionBarTemplate$;
  }
}
