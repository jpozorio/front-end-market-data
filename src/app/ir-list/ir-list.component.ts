import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';

interface DaySummary {
  day;
  brutoDayTrade: 0.00;
  liquidoDayTrade: 0.00;
  impostoRetido: 0.00;
  impostoTotal: 0.00;
}

@Component({
  selector   : 'app-ir-list',
  templateUrl: './ir-list.component.html',
  styleUrls  : ['./ir-list.component.scss'],
})
export class IrListComponent implements OnInit {

  dayTradeSummaryDays: DaySummary[] = [];
  total: DaySummary;

  displayedColumns: string[] = [
    'day',
    'brutoDayTrade',
    'impostoRetido',
    'taxasOperacionais',
    'custoBolsa',
    'custoTotal',
    'liquidoDayTrade',
    'impostoTotal',
    'impostoDevido',
  ];

  constructor(
    private readonly apiService: ApiService,
  ) {
    this.total = {
      day            : null,
      brutoDayTrade  : 0.00,
      liquidoDayTrade: 0.00,
      impostoRetido  : 0.00,
      impostoTotal   : 0.00,
    };
  }

  ngOnInit(): void {
    this.apiService.listIrData().subscribe(resp => {
      this.dayTradeSummaryDays = resp;
    });
  }

}
