import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector   : 'app-quotes-view',
  templateUrl: './dolar.component.html',
  styleUrls  : ['./dolar.component.scss'],
})
export class DolarComponent implements OnInit {

  BACKGROUND_COLOR_LAST_PRICE = 'background-color: #e3dfff';
  BACKGROUND_COLOR_AJUSTE = 'background-color: #d6efd1';
  BACKGROUND_COLOR_VARIATIONS = 'background-color: #ecec9357';
  LAST_PRICE_LABEL = 'Fechamento';
  AJUSTE_LABEL = 'Ajuste';
  lastPrice;
  ajustPrice;
  currentContract;
  maxPrice;
  minPrice;

  lastPriceAndAjuste;
  lastPriceAndAjusteColumns: string[] = [
    'label',
    '-2.0 %',
    '-1.5 %',
    '-1.0 %',
    '-0.5 %',
    ' 0.0 %',
    '+0.5 %',
    '+1.0 %',
    '+1.5 %',
    '+2.0 %',
  ];

  dataSource;
  displayedColumns: string[] = [
    'day',
    'instrument',
    'first_price',
    'min_price',
    'max_price',
    'ajuste',
    'last_price',
  ];

  constructor(public apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getDolarData().subscribe(resp => {
      this.dataSource = resp;
      const firstData = resp[0];
      this.lastPrice = {price: firstData.last_price, label: this.LAST_PRICE_LABEL};
      this.ajustPrice = {price: firstData.ajuste, label: this.AJUSTE_LABEL};
      this.maxPrice = firstData.maxima_contrato;
      this.minPrice = firstData.minima_contrato;
      this.currentContract = firstData.instrument;
      this.lastPriceAndAjuste = [this.lastPrice, this.ajustPrice];
    });
  }

  getLastPriceStyle(element): string {
    if (element.label === this.LAST_PRICE_LABEL) {
      return this.BACKGROUND_COLOR_LAST_PRICE;
    } else {
      return this.BACKGROUND_COLOR_AJUSTE;
    }
  }

}
