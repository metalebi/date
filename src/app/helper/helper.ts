import * as moment from "jalali-moment";
import { DateMonthVm, WeekTypeShEnm } from "../modules/date/model/dateMonthVm";
import { dateDetectionTypeEnm } from "../model/enm/dateDetectionTypeEnm";
import { DateCalendarTypeEnm } from "../model/enm/dateCalendarTypeEnm";

export class DateHelper {
    static DaysOfTheMonth(yearSh: number, monthSh: number): DateMonthVm[] {
        const monthDaysOne = Array.from(Array(moment(yearSh + '-' + monthSh, "YYYY-MM").locale('fa').daysInMonth()), (_, i) => i + 1);
        // const monthDaysOne = Array.from(Array(moment(year + '-' + month, "YYYY-MM").daysInMonth()), (_, i) => i + 1);
        const dateMonthList: DateMonthVm[] = [];
        monthDaysOne.forEach(day => {
            const dateDay: DateMonthVm = new DateMonthVm();
            dateDay.dataShamsi.yearSh = yearSh;
            dateDay.dataShamsi.monthSh = monthSh;
            dateDay.dataShamsi.daySh = day;
            dateDay.dataShamsi.weekTypeSh = this.NameOfTheDayOfTheWeek(yearSh + '-' + monthSh + '-' + day, dateTypeEnm.shamsi);
            if (dateDay.dataShamsi.weekTypeSh == WeekTypeShEnm.Fri)
                dateDay.isHoliday = true;
            dateDay.dataShamsi.isHolidaySh = false;

            dateDay.day = this.getYear(yearSh + '/' + monthSh + '/' + day, dateTypeEnm.shamsi);
            dateDay.month = this.getMonth(yearSh + '/' + monthSh + '/' + day, dateTypeEnm.shamsi);
            dateDay.year = this.getDay(yearSh + '/' + monthSh + '/' + day, dateTypeEnm.shamsi);
            dateDay.weekType = this.NameOfTheDayOfTheWeek(dateDay.year + '-' + dateDay.month + '-' + day, dateTypeEnm.gregorian);
            if (dateDay.weekType == WeekTypeShEnm.Fri)
                dateDay.isHoliday = true;
            dateDay.isHoliday = false;
            dateMonthList.push(dateDay);
        });
        return dateMonthList;
    }
     numLatinToFa=function(enNumber: any) {
        
    }
    static getYear(date: string, dateType: dateTypeEnm = dateTypeEnm.gregorian) {
        if (dateType == dateTypeEnm.gregorian)
            return +(moment(date).format('M'));
        return +(moment(this.convertDateShamsiToGregorian(date)).format('jM'));
    }
    static getMonth(date: string, dateType: dateTypeEnm = dateTypeEnm.gregorian) {
        if (dateType == dateTypeEnm.gregorian)
            return +(moment(date).format('YYYY'));
        return +(moment(this.convertDateShamsiToGregorian(date)).format('jYYYY'));
    }
    static getDay(date: string, dateType: dateTypeEnm = dateTypeEnm.gregorian) {
        if (dateType == dateTypeEnm.gregorian)
            return +(moment(date).format('D'));
        return +(moment(this.convertDateShamsiToGregorian(date)).format('jD'));
    }
    static NameOfTheDayOfTheWeek(date: string, dateType: dateTypeEnm = dateTypeEnm.gregorian): WeekTypeShEnm {
        let res: WeekTypeShEnm;
        if (dateType == dateTypeEnm.shamsi) {
            switch (moment.from(date, 'fa', 'YYYY-MM-DD').format('ddd')) {
                case 'Thu':
                    res = WeekTypeShEnm.Thu;
                    break
                case 'Fri':
                    res = WeekTypeShEnm.Fri;
                    break
                case 'Sat':
                    res = WeekTypeShEnm.Sat;
                    break
                case 'Sun':
                    res = WeekTypeShEnm.Sun;
                    break
                case 'Mon':
                    res = WeekTypeShEnm.Mon;
                    break
                case 'Tue':
                    res = WeekTypeShEnm.Tue;
                    break
                case 'Wed':
                    res = WeekTypeShEnm.Wed;
                    break
                default:
                    res = WeekTypeShEnm.none;
                    break
            }
        } else {
            switch (moment.from(date, 'YYYY-MM-DD').format('ddd')) {
                case 'Thu':
                    res = WeekTypeShEnm.Thu;
                    break
                case 'Fri':
                    res = WeekTypeShEnm.Fri;
                    break
                case 'Sat':
                    res = WeekTypeShEnm.Sat;
                    break
                case 'Sun':
                    res = WeekTypeShEnm.Sun;
                    break
                case 'Mon':
                    res = WeekTypeShEnm.Mon;
                    break
                case 'Tue':
                    res = WeekTypeShEnm.Tue;
                    break
                case 'Wed':
                    res = WeekTypeShEnm.Wed;
                    break
                default:
                    res = WeekTypeShEnm.none;
                    break
            }
        }
        return res;
    }
    static greaterDateDetection(startDate: string, endDate: string, type: DateCalendarTypeEnm): dateDetectionTypeEnm {
        let start = this.getYear(startDate);
        let end = this.getYear(endDate);
        if (start > end)
            return dateDetectionTypeEnm.startIsLarger;
        if (start < end)
            return dateDetectionTypeEnm.endIsLarger;

        start = this.getMonth(startDate);
        end = this.getMonth(endDate);
        if (start > end)
            return dateDetectionTypeEnm.startIsLarger;
        if (start < end)
            return dateDetectionTypeEnm.endIsLarger;

        start = this.getDay(startDate);
        end = this.getDay(endDate);
        if (start > end)
            return dateDetectionTypeEnm.startIsLarger;
        if (start < end)
            return dateDetectionTypeEnm.endIsLarger;

        return dateDetectionTypeEnm.equalDate;
    }
    static convertDateShamsiToGregorian(date: string) {
        return moment(date, 'jYYYY/jMM/jDD').format('YYYY-MM-DD')
    }
}

export enum dateTypeEnm {
    gregorian = 0,
    shamsi = 1,
}