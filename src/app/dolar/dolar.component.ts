import {Component, OnInit} from '@angular/core';
import {DolarService} from './dolar.service';

@Component({
  selector   : 'app-quotes-view',
  templateUrl: './dolar.component.html',
  styleUrls  : ['./dolar.component.scss'],
})
export class DolarComponent implements OnInit {

  BACKGROUND_COLOR_LAST_PRICE = 'fechamento';
  BACKGROUND_COLOR_AJUSTE = 'ajuste';
  BACKGROUND_COLOR_VARIATIONS = 'variacoes';

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

  displayedColumnsDI: string[] = [
    'instrument',
    'volume',
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

  getVariacaoStyle(element, variacao): string {
    if (element.label === this.dolarService.LAST_PRICE_LABEL) {
      if (variacao === 0.5) {
        return 'fechamento05';
      } else {
        return 'fechamento1';
      }
    } else {
      if (variacao === 0.5) {
        return 'ajuste05';
      } else {
        return 'ajuste1';
      }
    }
  }

  get dataSource() {
    return this.dolarService.dataSource;
  }

  get dataSourceDI() {
    return this.dolarService.dataSourceDI;
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

  get variations(): any[] {
    return this.dolarService.variations;
  }

  get variationsLastPrice(): any[] {
    return this.dolarService.variationsLastPrice;
  }

  get variationsAjuste(): any[] {
    return this.dolarService.variationsAjuste;
  }

}
