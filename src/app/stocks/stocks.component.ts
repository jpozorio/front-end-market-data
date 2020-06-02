import {Component, OnInit} from '@angular/core';
import {StockService} from './stocks.service';

@Component({
  selector   : 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls  : ['./stocks.component.scss'],
})
export class StocksComponent implements OnInit {

  displayedColumns: string[] = [
    'instrument',
    'preco_medio',
    'menor_variacao',
    'maior_variacao',
    'volume_medio',
  ];

  constructor(public stockSerivce: StockService) {
  }

  ngOnInit(): void {
    this.stockSerivce.subscribeStockData();
  }

}
