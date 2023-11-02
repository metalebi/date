import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'jalali-moment';
import { DateMonthVm, WeekTypeShEnm } from '../../model/dateMonthVm';
import { DateHelper } from 'src/app/helper/helper';
import { MonthVm } from '../../model/monthVm';

@Component({
  selector: 'data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  // moment.from('1402/07/20', 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');      convert date ahamsi to milady  
  // moment('1989/01/24', 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');      convert date milady to shamsi  
  // api: string = 'https://holidayapi.ir/jalali/{year}}/{month}/{day}';

  constructor(private http: HttpClient) { };

  ngOnInit() {
    this.yearOne = moment().year();
    this.yearTwo = moment().year();
    this.monthDateOneSh = +(moment().locale('fa').format('MM'));
    this.monthDateOne = +(moment().format('MM'));
    this.getDateOfDay();

  }
  dateSelect1!: string;
  dateSelect2!: string;
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


  openMenuDate() {
    this.showDate = true;
  }
  getDateOfDay() {

    this.dayOfMonth.month1 = DateHelper.DaysOfTheMonth(this.yearOne, this.monthDateOne, this.yearDateOneSh, this.monthDateOneSh);
    this.dayOfMonth.month2 = DateHelper.DaysOfTheMonth(this.yearTwo, this.monthDateTwo, this.yearDateTwoSh, this.monthDateTwoSh);

    const weekListSt = [WeekTypeShEnm.Sat, WeekTypeShEnm.Sun, WeekTypeShEnm.Mon, WeekTypeShEnm.Tue, WeekTypeShEnm.Wed, WeekTypeShEnm.Thu, WeekTypeShEnm.Fri];
    const indexGapOne = weekListSt.findIndex(m => m == this.dayOfMonth.month1[0].weekType);
    const indexGapTwo = weekListSt.findIndex(m => m == this.dayOfMonth.month2[0].weekType);
    for (let index = 0; index < indexGapOne; index++) {
      this.dayOfMonth.month1.splice(0, -1, new DateMonthVm());
    }
    for (let index = 0; index < indexGapTwo; index++) {
      this.dayOfMonth.month2.splice(0, -1, new DateMonthVm());
    }
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
  selectDate(item: DateMonthVm, status: boolean) {
    if (status) {
      this.dateSelect1 = this.yearDateOneSh + '/' + this.monthDateOneSh + '/' + item.day;
    } else {
      this.dateSelect2 = this.yearDateTwoSh + '/' + this.monthDateTwoSh + '/' + item.day;
    }
  }
}
class WeekVm {
  day!: string;
}




class Test {
  is_holiday!: boolean;
}