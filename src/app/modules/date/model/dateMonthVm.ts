export class DateMonthVm {
  day!: number;
  month!: number;
  year!: number;
  weekType!: WeekTypeShEnm;
  isHoliday!: boolean;
  betWeenSelect: boolean = false;
  selectedFirst: boolean = false;
  selectedEnd: boolean = false;
  dataShamsi: DateShVm = new DateShVm()

}
export class DateShVm {
  daySh!: number;
  monthSh!: number;
  yearSh!: number;
  weekTypeSh!: WeekTypeShEnm;
  isHolidaySh!: boolean;
  betWeenSelectSh: boolean = false;
  selectedFirstSh: boolean = false;
  selectedEndSh: boolean = false;
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