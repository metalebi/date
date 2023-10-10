import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'jalali-moment';
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  constructor(private http: HttpClient) { };

  ngOnInit() {
    const m = moment();
    const year = m.year();
    const month = m.format('MM');

    // console.log(Array.from({ length: moment(year + '-' + month).locale('fa').daysInMonth() }, (x, i) => moment().startOf('month').add(i, 'days').format('DD')));
    this.dayOfMonth = Array.from(Array(moment(year + '-' + month).locale('fa').daysInMonth()), (_, i) => i + 1);
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
  ]
  dayOfMonth: number[] = [];
  api: string = 'https://api.keybit.ir/time';
  url = `http://domain.com/wp-json/`;

}
class WeekVm {
  day!: string;
}
