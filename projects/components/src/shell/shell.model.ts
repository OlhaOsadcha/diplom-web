import { TemplateRef } from '@angular/core';

export interface HeaderConfig {
  headerTitle?: string;
  menuIcon?: string;
  showActionBar?: boolean; // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actionBarTemplate?: TemplateRef<any> | null;
}
