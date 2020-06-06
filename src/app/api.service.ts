import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {DolarService} from './dolar/dolar.service';
import {StockService} from './stocks/stocks.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  host: string;

  constructor(
    private http: HttpClient,
  ) {
    if (environment.production) {
      this.host = 'https://b3-dol-data.herokuapp.com';
    } else {
      this.host = 'http://localhost:8080';
    }
  }

  getDolarData(): Observable<any> {
    return this.http.get(this.host + '/dolar/dadosDolar');
  }

  getStocksData(): Observable<any> {
    return this.http.get(this.host + '/dolar/ativosDayTrade');
  }

  downloadData(appComponent: AppComponent, stockService: StockService, dolarService: DolarService) {
    return this.http.get(this.host + '/dolar/download').subscribe(r => {
      appComponent.atualizando = false;
      stockService.subscribeStockData();
      dolarService.subscribeDolarData();
    });
  }

  getDIData(): Observable<any> {
    return this.http.get(this.host + '/dolar/dadosDI');
  }
}
