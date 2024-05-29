import { NativeDateAdapter } from '@angular/material/core';

export class CustomDateAdapter extends NativeDateAdapter {
  override parse(value: any, parseFormat?: any): Date | null {
    const date = value.split('/')[0];
    const month = Number(value.split('/')[1]) - 1;
    const year = value.split('/')[2];
    return new Date(year, month, date);
  }
}
