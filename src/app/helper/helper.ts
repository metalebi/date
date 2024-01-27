import * as moment from "jalali-moment";
import { DateMonthVm, WeekTypeShEnm } from "../modules/date/model/dateMonthVm";
import { dateDetectionTypeEnm } from "../model/enm/dateDetectionTypeEnm";

export class DateHelper {
    static DaysOfTheMonth(year: number, month: number, yearSh: number, monthSh: number): DateMonthVm[] {
        const monthDaysOne = Array.from(Array(moment(year + '-' + month).locale('fa').daysInMonth()), (_, i) => i + 1);
        const dateMonthList: DateMonthVm[] = [];
        monthDaysOne.forEach(day => {
            const dateDay: DateMonthVm = new DateMonthVm();
            dateDay.isHoliday = false;
            dateDay.day = day;
            dateDay.weekType = this.NameOfTheDayOfTheWeekSh(yearSh + '-' + monthSh + '-' + day);
            if (dateDay.weekType == WeekTypeShEnm.Fri)
                dateDay.isHoliday = true;
            dateMonthList.push(dateDay);
        });
        return dateMonthList;
    }
    static NameOfTheDayOfTheWeekSh(date: string): WeekTypeShEnm {
        switch (moment.from(date, 'fa', 'YYYY-MM-DD').format('ddd')) {
            case 'Thu':
                return WeekTypeShEnm.Thu;
            case 'Fri':
                return WeekTypeShEnm.Fri;
            case 'Sat':
                return WeekTypeShEnm.Sat;
            case 'Sun':
                return WeekTypeShEnm.Sun;
            case 'Mon':
                return WeekTypeShEnm.Mon;
            case 'Tue':
                return WeekTypeShEnm.Tue;
            case 'Wed':
                return WeekTypeShEnm.Wed;
            default:
                return WeekTypeShEnm.none;
        }
    }
    static greaterDateDetection(startDate: string, endDate: string): dateDetectionTypeEnm {
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
    static getYear(data: string) {
        return +(moment(data).format('YYYY'))
    }
    static getMonth(data: string) {
        return +(moment(data).format('M'))
    }
    static getDay(data: string) {
        return +(moment(data).format('D'))
    }
}