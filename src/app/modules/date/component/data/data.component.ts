import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateMonthVm, WeekTypeShEnm } from '../../model/dateMonthVm';
import { DateHelper, dateTypeEnm } from 'src/app/helper/helper';
import { MonthVm } from '../../model/monthVm';
import { dateDetectionTypeEnm } from 'src/app/model/enm/dateDetectionTypeEnm';
import { DateCalendarTypeEnm } from 'src/app/model/enm/dateCalendarTypeEnm';
// import * as moment from 'jalali-moment';
import moment from 'jalali-moment';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  // moment.from('1402/07/20', 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');      convert date ahamsi to milady  
  // moment('1989/01/24', 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');      convert date milady to shamsi  
  // api: string = 'https://holidayapi.ir/jalali/{year}}/{month}/{day}';

  constructor(private http: HttpClient, private fb: FormBuilder) { };

  ngOnInit() {
    this.yearOne = moment().year();
    this.yearTwo = moment().year();
    this.monthDateOneSh = +(moment().locale('fa').format('MM'));
    this.monthDateOne = +(moment().format('MM'));
    this.getDateOfDay();

  }

  @Output() inputForm = new dataOutPutVm();
  @Output() onChange = new EventEmitter<dataOutPutVm>();
  formControlInput = this.fb.control(null);

  dateSelect1!: SelectDate;
  dateSelect2!: SelectDate;
  showDate: boolean = false;
  isDayNow: boolean = false;
  yearOne!: number;
  yearTwo!: number;
  WeekTypeShEnm = WeekTypeShEnm;
  dayOfMonth: MonthVm = new MonthVm();
  dateNow: string = moment().format('YYYY-MM-DD');
  yearNow: number = +(moment().format('YYYY'));
  monthNow: number = +(moment().format('MM'))
  monthDateTwo!: number;
  private _monthDate1: number = 0;
  set monthDateOne(value) {
    this._monthDate1 = value;
    if (value == 12) {
      this.monthDateTwo = 1;
    } else {
      this.monthDateTwo = value + 1;
    }
  }
  get monthDateOne() {
    return this._monthDate1;
  }

  dayDateNowSh: number = +(moment().locale('fa').format('DD'));
  monthDateNowSh: number = +(moment().locale('fa').format('MM'));
  yearDateNowSh: number = +(moment().locale('fa').format('YYYY'));
  yearDateOneSh: number = +(moment().locale('fa').format('YYYY'));
  yearDateTwoSh: number = +(moment().locale('fa').format('YYYY'));
  monthDateTwoSh: number = 0;
  private _monthDateOneSh: number = 0;
  set monthDateOneSh(value) {
    this._monthDateOneSh = value;
    if (value == 12) {
      this.monthDateTwoSh = 1;
    } else {
      this.monthDateTwoSh = value + 1;
    }
  }
  get monthDateOneSh() {
    return this._monthDateOneSh;
  }

  weekList: WeekVm[] = [
    {
      day: 'ش'
    },
    {
      day: 'ی'
    }
    ,
    {
      day: 'د'
    },
    {
      day: 'س'
    },
    {
      day: 'چ'
    },
    {
      day: 'پ'
    },
    {
      day: 'ج'
    }
  ];


  getDateOfDay() {
    this.dayOfMonth.month1 = DateHelper.DaysOfTheMonth(this.yearDateOneSh, this.monthDateOneSh);
    this.dayOfMonth.month2 = DateHelper.DaysOfTheMonth(this.yearDateTwoSh, this.monthDateTwoSh);
    const weekListSt = [WeekTypeShEnm.Sat, WeekTypeShEnm.Sun, WeekTypeShEnm.Mon, WeekTypeShEnm.Tue, WeekTypeShEnm.Wed, WeekTypeShEnm.Thu, WeekTypeShEnm.Fri];
    const indexGapOne = weekListSt.findIndex(m => m == this.dayOfMonth.month1[0].dataShamsi?.weekTypeSh);
    const indexGapTwo = weekListSt.findIndex(m => m == this.dayOfMonth.month2[0].dataShamsi?.weekTypeSh);
    for (let index = 0; index < indexGapOne; index++) {
      this.dayOfMonth.month1.splice(0, -1, new DateMonthVm());
    }
    for (let index = 0; index < indexGapTwo; index++) {
      this.dayOfMonth.month2.splice(0, -1, new DateMonthVm());
    }

    this.dayOfMonth.month1.forEach(element => {
      element.betWeenSelect = this.hasBetweenDate(element);
      if (element?.dataShamsi?.daySh == this.dateSelect1?.day && element?.dataShamsi?.monthSh == this.dateSelect1?.month &&
        element?.dataShamsi?.yearSh == this.dateSelect1?.year && element?.day)
        element.dataShamsi.selectedFirstSh = true;
      if (element?.dataShamsi?.daySh == this.dateSelect2?.day && element?.dataShamsi?.monthSh == this.dateSelect2?.month &&
        element?.dataShamsi?.yearSh == this.dateSelect2?.year && element?.day)
        element.dataShamsi.selectedEndSh = true;
      element.dataShamsi.betWeenSelectSh = this.hasBetweenDate(element);
    });
    this.dayOfMonth.month2.forEach(element => {
      element.betWeenSelect = this.hasBetweenDate(element);
      if (element?.dataShamsi?.daySh == this.dateSelect1?.day && element?.dataShamsi?.monthSh == this.dateSelect1?.month &&
        element?.dataShamsi?.yearSh == this.dateSelect1?.year && element?.dataShamsi?.daySh)
        element.dataShamsi.selectedFirstSh = true;
      if (element?.dataShamsi?.daySh == this.dateSelect2?.day && element?.dataShamsi?.monthSh == this.dateSelect2?.month &&
        element?.dataShamsi?.yearSh == this.dateSelect2?.year && element?.dataShamsi.daySh)
        element.dataShamsi.selectedEndSh = true;
      element.dataShamsi.betWeenSelectSh = this.hasBetweenDate(element);
    });
  }
  changeMonth(status: boolean) {
    if (status) {
      if (this.monthDateOne == 12) {
        this.monthDateOne = 0;
        this.yearOne += 1;
      } else if (this.monthDateTwo) {
        this.yearTwo += 1;
      }

      if (this.monthDateOneSh == 12) {
        this.monthDateOneSh = 0;
        this.yearDateOneSh += 1;
      } else if (this.monthDateTwoSh == 12) {
        this.yearDateTwoSh += 1;
      }
      this.monthDateOne += 1;
      this.monthDateOneSh += 1;
    } else {
      if (this.monthDateOne == 1) {
        this.monthDateOne = 13;
        this.yearOne -= 1;
      } else if (this.monthDateTwo == 1) {
        this.yearTwo -= 1;
      }

      if (this.monthDateOneSh == 1) {
        this.monthDateOneSh = 13
        this.yearDateOneSh -= 1;
      } else if (this.monthDateTwoSh == 1) {
        this.yearDateTwoSh -= 1;
      }
      this.monthDateOne -= 1;
      this.monthDateOneSh -= 1;
    }
    this.getDateOfDay();
  }
  changeYears(status: boolean) {
    if (status) {
      this.yearDateOneSh += 1;
      this.yearDateTwoSh += 1;
      this.yearOne += 1;
      this.yearTwo += 1;
    } else {
      this.yearDateOneSh -= 1;
      this.yearDateTwoSh -= 1;
      this.yearOne -= 1;
      this.yearTwo -= 1;
    }
    this.getDateOfDay();
  }
  getNameMonth(value: number) {
    switch (value) {
      case 1:
        return 'فروردین';
      case 2:
        return 'اردیبهشت';
      case 3:
        return 'خرداد';
      case 4:
        return 'تیر';
      case 5:
        return 'مرداد';
      case 6:
        return 'شهریور';
      case 7:
        return 'مهر';
      case 8:
        return 'آبان';
      case 9:
        return 'آذر';
      case 10:
        return 'دی';
      case 11:
        return 'بهمن';
      case 12:
        return 'اسفند';
      default:
        return '';
    }
  }
  goToDayNow() {
    if (this.monthDateNowSh == 12) {
      this.yearDateOneSh = this.yearDateNowSh;
      this.yearDateTwoSh = this.yearDateOneSh + 1;
      this.yearOne = this.yearNow;
      this.yearTwo = this.yearOne + 1;
    } else {
      this.yearDateOneSh = this.yearDateTwoSh = this.yearDateNowSh;
      this.yearOne = this.yearTwo = this.yearNow;
    }
    this.isDayNow = true;
    setTimeout(() => {
      this.isDayNow = false;
    }, 1000);
    this.monthDateOne = this.monthNow;
    this.monthDateOneSh = this.monthDateNowSh;

    this.getDateOfDay();
  }
  classGetDateNow(item: number, isFirst: boolean) {
    if (isFirst) {
      return ((this.yearDateNowSh == this.yearDateOneSh) &&
        (this.monthDateNowSh == this.monthDateOneSh) &&
        this.dayDateNowSh == item)
    }
    return ((this.yearDateNowSh == this.yearDateTwoSh) &&
      (this.monthDateNowSh == this.monthDateTwoSh) &&
      this.dayDateNowSh == item);
  }
  selectDate(item: DateMonthVm, firstTable: boolean, index: number) {
    let newDate: string = '';
    if (firstTable) {
      newDate = moment.from(this.yearDateOneSh + '/' + this.monthDateOneSh + '/' + item?.dataShamsi?.daySh, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');
    } else {
      newDate = moment.from(this.yearDateTwoSh + '/' + this.monthDateTwoSh + '/' + item?.dataShamsi?.daySh, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');
    }
    let dateOne = moment.from(this.dateSelect1?.date, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');
    this.dayOfMonth.month1.map(m => m.dataShamsi.betWeenSelectSh = false);
    this.dayOfMonth.month2.map(m => m.dataShamsi.betWeenSelectSh = false);
    if (!this.dateSelect1?.date?.length || this.dateSelect2?.date?.length ||
      (DateHelper.greaterDateDetection(newDate, dateOne, DateCalendarTypeEnm.gregorian) == dateDetectionTypeEnm.endIsLarger ||
        DateHelper.greaterDateDetection(newDate, dateOne, DateCalendarTypeEnm.gregorian) == dateDetectionTypeEnm.equalDate)) {
      // set First and clear two
      this.dayOfMonth.month1.map(m => m.dataShamsi.selectedFirstSh = false);
      this.dayOfMonth.month2.map(m => m.dataShamsi.selectedFirstSh = false);
      this.dayOfMonth.month1.map(m => m.dataShamsi.selectedEndSh = false);
      this.dayOfMonth.month2.map(m => m.dataShamsi.selectedEndSh = false);
      this.dateSelect2 = new SelectDate();
      this.dateSelect1 = new SelectDate(item?.dataShamsi?.daySh, item?.dataShamsi?.monthSh, item?.dataShamsi?.yearSh);
      item.dataShamsi.selectedFirstSh = true;
    } else {
      // set two
      this.dateSelect2 = new SelectDate(item?.dataShamsi?.daySh, item?.dataShamsi?.monthSh, item?.dataShamsi?.yearSh);
      item.dataShamsi.selectedEndSh = true;
      this.dayOfMonth?.month1.forEach(element => {
        element.dataShamsi.betWeenSelectSh = this.hasBetweenDate(element);
      });
      this.dayOfMonth?.month2.forEach(element => {
        element.dataShamsi.betWeenSelectSh = this.hasBetweenDate(element);
      });
    }
    this.mapAngChangeData();
  }
  mapAngChangeData() {
    this.inputForm = new dataOutPutVm();
    this.inputForm.selectDateOne = DateHelper.convertDateShamsiToGregorian(this.dateSelect1?.date);
    if (this.dateSelect2?.date?.length) {
      this.inputForm.selectDateTwo = DateHelper.convertDateShamsiToGregorian(this.dateSelect2?.date);
      const dayOne: number = 24 * 60 * 60 * 1000;
      const date1 = new Date(this.dateSelect1?.date);
      const date2 = new Date(this.dateSelect2?.date);
      this.inputForm.numberNightBetweenDates = Math.round(Math.abs(date2.getTime() - date1.getTime())) / dayOne;
      this.inputForm.numberDayBetweenDates = this.inputForm.numberNightBetweenDates + 1;
    }
    this.onChange.emit(this.inputForm);
    console.log(this.inputForm);

  }
  private hasBetweenDate(model: DateMonthVm) {
    if (!model?.dataShamsi?.daySh || !this.dateSelect1)
      return false;

    if (model?.dataShamsi?.yearSh < this.dateSelect1?.year)
      return false;
    if (model?.dataShamsi?.monthSh < this.dateSelect1?.month) {
      if (model?.dataShamsi?.yearSh == this.dateSelect1.year) {
        return false;
      }
    }
    if (model?.dataShamsi?.daySh < this.dateSelect1?.day) {
      if (model?.dataShamsi?.yearSh == this.dateSelect1?.year && model?.dataShamsi?.monthSh == this.dateSelect1?.month) {
        return false;
      }
    }

    if (model?.dataShamsi?.yearSh > this.dateSelect2?.year)
      return false;
    if (model?.dataShamsi?.monthSh > this.dateSelect2?.month) {
      if (model?.dataShamsi?.yearSh == this.dateSelect2?.year) {
        return false;
      }
    }
    if (model?.dataShamsi?.daySh > this.dateSelect2?.day) {
      if (model?.dataShamsi?.yearSh == this.dateSelect2?.year && model?.dataShamsi?.monthSh == this.dateSelect2?.month) {
        return false;
      }
    }
    return true;
  }
  getClassDay(item: DateMonthVm, isFirst: boolean) {
    let res = '';
    if (item?.dataShamsi?.weekTypeSh == WeekTypeShEnm.Fri)
      res += ' ' + 'fri-day';
    if (!item?.dataShamsi?.daySh)
      res += ' ' + 'no-day-month';
    if (this.classGetDateNow(item?.dataShamsi?.daySh ?? 0, isFirst))
      res += ' ' + 'day-now';
    if (this.isDayNow)
      res += ' ' + 'is-day-now';
    if (item?.dataShamsi?.selectedEndSh || item?.dataShamsi?.selectedFirstSh)
      res += ' ' + 'active-date';
    if (item?.dataShamsi?.betWeenSelectSh)
      res += ' ' + 'between-dates';

    return res;


  }
}
class WeekVm {
  day!: string;
}
class SelectDate {
  constructor(public day: number = 0, public month: number = 0, public year: number = 0) {
    if (day > 0 && month > 0 && year > 0) {
      this.date = year + '/' + month + '/' + day;
    }
  }
  date!: string;
}

class dataOutPutVm {
  selectDateOne!: string;
  selectDateTwo!: string;
  numberDayBetweenDates!: number; //تعداد روز بین تاریخ
  numberNightBetweenDates!: number; // تعداد شب بین تاریخ
}