import {Component} from '@angular/core';
import {ApiService} from './api.service';
import {DolarService} from './dolar/dolar.service';
import {StockService} from './stocks/stocks.service';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.scss'],
})
export class AppComponent {
  title = 'Dados B3';

  atualizando = false;

  constructor(
    public apiService: ApiService,
    public stockService: StockService,
    public dolarService: DolarService,
  ) {
  }

  downloadData() {
    this.atualizando = true;
    this.apiService.downloadData(this, this.stockService, this.dolarService);
  }
}
