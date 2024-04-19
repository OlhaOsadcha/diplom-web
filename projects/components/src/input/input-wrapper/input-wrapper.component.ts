import { Component, Inject, Input, Optional } from '@angular/core';
import {
  COMPONENT_CONFIG,
  ComponentConfig,
  DEFAULT_COMPONENT_CONFIG,
} from '../../utils/component.config';
import { LabelComponent } from '../label/label.component';
import { TextComponent } from 'components';
import { LibMarkdownPipe } from '../../text/lib-markdown.pipe';
import { ErrorLabelComponent } from '../error-label/error-label.component';

@Component({
  selector: 'lib-input-wrapper',
  templateUrl: './input-wrapper.component.html',
  styleUrl: 'input-wrapper.component.scss',
  standalone: true,
  imports: [LabelComponent, TextComponent, LibMarkdownPipe, ErrorLabelComponent],
})
export class InputWrapperComponent {
  private componentConfig: ComponentConfig;

  @Input() public label: string = '';
  @Input() public optional: boolean = false;
  @Input() public assistiveText: string | string[] = [];
  @Input() public errors: string[] = [];
  @Input() public bottomInfoText: string | string[] = [];
  @Input() public touched: boolean | undefined;

  constructor(@Optional() @Inject(COMPONENT_CONFIG) inputWrapperConfig: ComponentConfig) {
    this.componentConfig = inputWrapperConfig || DEFAULT_COMPONENT_CONFIG;
  }

  public get assistiveTextRows(): string[] {
    return Array.isArray(this.assistiveText) ? this.assistiveText : [this.assistiveText];
  }

  public get bottomInfoTextRows(): string[] {
    return Array.isArray(this.bottomInfoText) ? this.bottomInfoText : [this.bottomInfoText];
  }

  public get wrapperErrors(): string[] {
    return this.componentConfig.hideErrorsWhenFieldNotTouched && !this.touched ? [] : this.errors;
  }
}
