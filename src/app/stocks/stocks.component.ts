import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector   : 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls  : ['./stocks.component.scss'],
})
export class StocksComponent implements OnInit {

  dataSource;
  displayedColumns: string[] = [
    'instrument',
    'preco_medio',
    'menor_variacao',
    'maior_variacao',
    'volume_medio',
  ];

  constructor(public apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getStocksData().subscribe(resp => {
      this.dataSource = resp;
    });
  }

}
