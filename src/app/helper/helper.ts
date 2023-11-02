import * as moment from "jalali-moment";
import { DateMonthVm, WeekTypeShEnm } from "../modules/date/model/dateMonthVm";

export class DateHelper {
    static DaysOfTheMonth(year: number, month: number, yearSh: number, monthSh: number): DateMonthVm[] {
        const monthDaysOne = Array.from(Array(moment(year + '-' + month).locale('fa').daysInMonth()), (_, i) => i + 1);
        const dateMonthList: DateMonthVm[] = [];
        monthDaysOne.forEach(day => {
            const dateDay: DateMonthVm = {
                isHoliday: false,
                day: day,
                weekType: this.NameOfTheDayOfTheWeekSh(yearSh + '-' + monthSh + '-' + day)
            }
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
}