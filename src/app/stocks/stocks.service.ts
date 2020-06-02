import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class StockService {

  dataSource;

  constructor(public apiService: ApiService) {
  }

  subscribeStockData(): void {
    this.apiService.getStocksData().subscribe(resp => {
      this.dataSource = resp;
    });
  }
}
