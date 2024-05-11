import { EventEmitter } from '@angular/core';

export interface InputInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueChange: EventEmitter<any>;
  touched: EventEmitter<boolean>;
  blur: EventEmitter<boolean>;
  focus: EventEmitter<void>;
}
