export class DateMonthVm {
  day!: number;
  weekType!: WeekTypeShEnm;
  isHoliday!: boolean;
  betWeenSelect: boolean = false;
  selectedFirst: boolean = false;
  selectedEnd: boolean = false;

}
export enum WeekTypeShEnm {
  none = 0,
  Sat = 'شنبه',
  Sun = 'یک شنبه',
  Mon = 'دوشنبه',
  Tue = 'سه شنبه',
  Wed = 'چهارشنبه',
  Thu = 'پنج شنبه',
  Fri = 'جمعه',
}