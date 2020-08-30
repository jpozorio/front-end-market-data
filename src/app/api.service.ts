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
    return this.http.get('/market-data/dolar/dadosDolar');
  }

  getStocksData(): Observable<any> {
    return this.http.get('/market-data/dolar/ativosDayTrade');
  }

  downloadData(
    appComponent: AppComponent,
    stockService: StockService,
    dolarService: DolarService,
  ) {
    return this.http.get('/market-data/dolar/download').subscribe(r => {
      appComponent.atualizando = false;
      stockService.subscribeStockData();
      dolarService.subscribeDolarData();
    });
  }

  getDIData(): Observable<any> {
    return this.http.get('/market-data/dolar/dadosDI');
  }

  createUser(user): Observable<any> {
    return this.http.post('/market-data/user/create', user);
  }

  authenticate(user): Observable<any> {
    return this.http.post('/market-data/login', user);
  }

  postFiles(files: any[]): Observable<any> {
    const formData: FormData = new FormData();

    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < files.length; index++) {
      const currentFile = files[index];
      formData.append('file', currentFile, currentFile.name);
    }
    const endpoint = '/market-data/ir-calculator/calculate';

    return this.http.post(endpoint, formData, {});
  }

  processFiles(filesPassword: string): Observable<any> {
    const endpoint = '/market-data/ir-calculator/process-pending-notes';

    return this.http.post(endpoint, {
      filesPassword: filesPassword,
    });
  }

  listIrData(): Observable<any> {
    const endpoint = '/market-data/ir-list/list';

    return this.http.get(endpoint, {});
  }

  listIrGroupedByMonth(): Observable<any> {
    const endpoint = '/market-data/ir-list/ir-list-by-month';

    return this.http.get(endpoint, {});
  }

}
