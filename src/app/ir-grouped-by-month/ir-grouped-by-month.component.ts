import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';

interface MonthSummary {
  month;
  brutoDayTrade: 0.00;
  liquidoDayTrade: 0.00;
  impostoRetido: 0.00;
  impostoTotal: 0.00;
}

@Component({
  selector   : 'app-grouped-by-month',
  templateUrl: './ir-grouped-by-month.component.html',
  styleUrls  : ['./ir-grouped-by-month.component.scss'],
})
export class IrGroupedByMonthComponent implements OnInit {

  dayTradeSummaryMonths: MonthSummary[] = [];

  displayedColumns: string[] = [
    'month',
    'brutoDayTrade',
    'liquidoDayTrade',
    'impostoBase',
    'impostoRetido',
    'impostoTotal',
    'impostoDevido',
  ];

  constructor(
    private readonly apiService: ApiService,
  ) {

  }

  ngOnInit(): void {
    this.apiService.listIrGroupedByMonth().subscribe(resp => {
      this.dayTradeSummaryMonths = resp;
    });
  }

}
