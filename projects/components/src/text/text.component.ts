import { Component, HostBinding, Input } from '@angular/core';

const isTrue = (value: boolean | undefined) => value !== undefined && value !== false;

@Component({
  selector: 'lib-text',
  templateUrl: 'text.component.html',
  styleUrl: 'text.component.scss',
  standalone: true,
})
export class TextComponent {
  @HostBinding('class.bold') public boldClass: boolean | undefined;
  @Input() public set bold(value: boolean) {
    this.boldClass = isTrue(value);
  }

  @HostBinding('class.grey') public greyClass: boolean | undefined;
  @Input() public set grey(value: boolean) {
    this.greyClass = isTrue(value);
  }

  @HostBinding('class.large') public largeClass: boolean | undefined;
  @Input() public set large(value: boolean) {
    this.largeClass = isTrue(value);
  }
}
