import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppComponent} from './app.component';
import {DolarService} from './dolar/dolar.service';
import {StockService} from './stocks/stocks.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getDolarData(): Observable<any> {
    return this.http.get('/marked-data/dolar/dadosDolar');
  }

  getStocksData(): Observable<any> {
    return this.http.get('/marked-data/dolar/ativosDayTrade');
  }

  downloadData(appComponent: AppComponent, stockService: StockService, dolarService: DolarService) {
    return this.http.get('/marked-data/dolar/download').subscribe(r => {
      appComponent.atualizando = false;
      stockService.subscribeStockData();
      dolarService.subscribeDolarData();
    });
  }
}
