import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from './api.service';
import {DolarService} from './dolar/dolar.service';
import {StockService} from './stocks/stocks.service';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Dados B3';

  adminMode = false;
  atualizando = false;

  constructor(
    public apiService: ApiService,
    public stockService: StockService,
    public dolarService: DolarService,
    public route: ActivatedRoute,
  ) {
  }

  downloadData() {
    this.atualizando = true;
    this.apiService.downloadData(this, this.stockService, this.dolarService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.adminMode = params.adminMode;
    });
  }
}
