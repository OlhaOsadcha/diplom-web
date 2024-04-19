import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { TextFieldComponent } from './text-field.component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[libTextField]',
  standalone: true,
})
export class TextFieldDirective implements OnInit {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  public ngOnInit(): void {
    this.viewContainerRef.createComponent(TextFieldComponent).instance.template = this.templateRef;
  }
}
