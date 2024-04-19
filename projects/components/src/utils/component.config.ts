import { InjectionToken } from '@angular/core';

export const COMPONENT_CONFIG = new InjectionToken('COMPONENT_CONFIG');

export interface ComponentConfig {
  hideErrorsWhenFieldNotTouched: boolean;
}

export const DEFAULT_COMPONENT_CONFIG: ComponentConfig = {
  hideErrorsWhenFieldNotTouched: false,
};
