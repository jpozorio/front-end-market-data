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

  constructor(public apiService: ApiService) {
  }

  subscribeDolarData(): void {
    this.apiService.getDolarData().subscribe(resp => {
      this.dataSource = resp;
      const firstData = resp[0];
      const lastPrice = {price: firstData.last_price, label: this.LAST_PRICE_LABEL};
      const ajustPrice = {price: firstData.ajuste, label: this.AJUSTE_LABEL};
      this.maxPrice = firstData.maxima_contrato;
      this.minPrice = firstData.minima_contrato;
      this.currentContract = firstData.instrument;
      this.lastPriceAndAjuste = [lastPrice, ajustPrice];
    });
  }
}
