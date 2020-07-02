import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class DolarService {
  LAST_PRICE_LABEL = 'Fechamento';
  AJUSTE_LABEL = 'Ajuste';

  // lastPrice;
  // ajustPrice;
  currentContract;
  maxPrice;
  minPrice;

  lastPriceAndAjuste;
  dataSource;
  dataSourceDI;
  percentsToFill = [-3, -2.5, -2, -1.5, -1, -0.5, +0.5, +1, +1.5, +2, +2.5, +3];
  variations = [];
  variationsLastPrice = [];
  variationsAjuste = [];
  selectedRowIndex = -1;

  constructor(public apiService: ApiService) {
  }

  subscribeDolarData(): void {
    this.apiService.getDolarData().subscribe(resp => {
      this.dataSource = resp;
      const firstData = resp[0];
      this.fillVariatinsData(firstData);
    });

    this.apiService.getDIData().subscribe(resp => {
      this.dataSourceDI = resp;
    });
  }

  fillVariatinsData(firstData): void {
    this.selectedRowIndex = firstData.id;
    this.variations = [];
    this.variationsLastPrice = [];
    this.variationsAjuste = [];
    const lastPrice = {price: firstData.last_price, label: this.LAST_PRICE_LABEL};
    const ajustPrice = {price: firstData.ajuste, label: this.AJUSTE_LABEL};
    this.maxPrice = firstData.maxima_contrato;
    this.minPrice = firstData.minima_contrato;
    this.currentContract = firstData.instrument;
    for (const percent of this.percentsToFill) {
      const labelFechamento = 'Fechamento';
      const labelAjuste = 'Ajuste';
      const valueToMultiply = (percent / 100);
      const valueLastPrice = firstData.last_price + (firstData.last_price * valueToMultiply);
      const valueAjuste = firstData.ajuste + (firstData.ajuste * valueToMultiply);
      const itemLastPrice = {
        label          : labelFechamento,
        value          : valueLastPrice,
        numberVariation: percent,
        roundedValue   : this.roundNumber(valueLastPrice),
      };
      const itemAjuste = {label: labelAjuste, value: valueAjuste, numberVariation: percent, roundedValue: this.roundNumber(valueAjuste)};
      this.variations.push(itemLastPrice);
      this.variations.push(itemAjuste);
      this.variationsLastPrice.push(itemLastPrice);
      this.variationsAjuste.push(itemAjuste);
    }
    this.variations.sort((a, b) => b.value - a.value);
    this.variationsLastPrice.sort((a, b) => b.value - a.value);
    this.variationsAjuste.sort((a, b) => b.value - a.value);
    this.lastPriceAndAjuste = [lastPrice, ajustPrice];
  }

  private roundNumber(n: number): number {
    // return n;
    const resto = n % 1;
    return resto <= 0.25 ? n - resto : resto <= 0.75 ? n - resto + 0.5 : n - resto + 1;
  }
}
