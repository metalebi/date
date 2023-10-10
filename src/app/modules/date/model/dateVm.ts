export class DateVm {
    years: number[] = [];   //سال ها
    monthOfYear: number[] = [];   //ماه های سال 
    daysOfMonth: number[] = [];     //روزهای ماه 
    daysWeek: string[] = [];         //روزهای هفته
    monthOfYearToStr: string[] = [];   //ماه های سال به صورت استرینگ
    dateOfDay!: string;              //تاریخ روز جاری
}