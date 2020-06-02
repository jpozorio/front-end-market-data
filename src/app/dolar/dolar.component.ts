import {Component, OnInit} from '@angular/core';
import {DolarService} from './dolar.service';

@Component({
  selector   : 'app-quotes-view',
  templateUrl: './dolar.component.html',
  styleUrls  : ['./dolar.component.scss'],
})
export class DolarComponent implements OnInit {

  BACKGROUND_COLOR_LAST_PRICE = 'background-color: #e3dfff';
  BACKGROUND_COLOR_AJUSTE = 'background-color: #d6efd1';
  BACKGROUND_COLOR_VARIATIONS = 'background-color: #ecec9357';

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

  displayedColumns: string[] = [
    'day',
    'instrument',
    'first_price',
    'min_price',
    'max_price',
    'ajuste',
    'last_price',
  ];

  constructor(
    public dolarService: DolarService,
  ) {
  }

  ngOnInit(): void {
    this.dolarService.subscribeDolarData();
  }

  getLastPriceStyle(element): string {
    if (element.label === this.dolarService.LAST_PRICE_LABEL) {
      return this.BACKGROUND_COLOR_LAST_PRICE;
    } else {
      return this.BACKGROUND_COLOR_AJUSTE;
    }
  }

  get dataSource() {
    return this.dolarService.dataSource;
  }

  get currentContract() {
    return this.dolarService.currentContract;
  }

  get maxPrice() {
    return this.dolarService.maxPrice;
  }

  get minPrice() {
    return this.dolarService.minPrice;
  }

  get lastPriceAndAjuste() {
    return this.dolarService.lastPriceAndAjuste;
  }

}
