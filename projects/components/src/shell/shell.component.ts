import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { HeaderComponent } from './header/header.component';
import { ShellService } from './shell.service';
import { DrawerMode, DrawerPosition } from './shell.model';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'lib-shell',
  templateUrl: 'shell.component.html',
  styleUrl: 'shell.component.scss',
  standalone: true,
  imports: [HeaderComponent, MatSidenavContent, MatSidenavContainer, MatSidenav, NgTemplateOutlet],
})
export class ShellComponent implements OnInit {
  @Input() public drawerIsOpened = false;
  @ViewChild('matSidenav', { static: true }) public matSidenav: MatSidenav | undefined;

  constructor(private shellService: ShellService) {}

  public ngOnInit(): void {
    this.shellService.registerMatSidenav(this.matSidenav);
  }

  public get drawerBackdrop(): boolean | undefined {
    return this.shellService.drawerBackdrop();
  }

  public get drawerDisableClose(): boolean | undefined {
    return this.shellService.drawerDisableClose();
  }

  public get drawerMode(): DrawerMode {
    return this.shellService.drawerMode();
  }

  public get drawerPosition(): DrawerPosition {
    return this.shellService.drawerPosition();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public get drawerTemplate(): any {
    return this.shellService.drawerTemplate();
  }
}
