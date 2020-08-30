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
  selector   : 'app-nota-corretagem-list',
  templateUrl: './nota-corretagem-list.component.html',
  styleUrls  : ['./nota-corretagem-list.component.scss'],
})
export class NotaCorretagemListComponent implements OnInit {

  dayTradeSummaryDays: DaySummary[] = [];
  total: DaySummary;

  displayedColumns: string[] = [
    'day',
    'brutoDayTrade',
    'liquidoDayTrade',
    'impostoRetido',
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
