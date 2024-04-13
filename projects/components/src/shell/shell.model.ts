import { TemplateRef } from '@angular/core';

export interface HeaderConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actionBarTemplate?: TemplateRef<any> | null;
  headerTitle?: string;
  menuIcon?: string;
  menuIconClickHandler?: (() => void) | undefined;
  showActionBar?: boolean;
}
