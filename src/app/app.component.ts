import {OverlayContainer} from '@angular/cdk/overlay';
import {Component, HostBinding, OnInit} from '@angular/core';
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

  @HostBinding('class') activeThemeCssClass: string;
  activeTheme = '';
  adminMode = false;
  atualizando = false;

  constructor(
    public apiService: ApiService,
    public stockService: StockService,
    public dolarService: DolarService,
    public route: ActivatedRoute,
    private overlayContainer: OverlayContainer,
  ) {
  }

  downloadData() {
    this.atualizando = true;
    this.apiService.downloadData(this, this.stockService, this.dolarService);
  }

  onSetTheme() {
    if (this.activeTheme === 'app-dark-theme') {
      this.activeTheme = 'app-light-theme';
    } else {
      this.activeTheme = 'app-dark-theme';
    }

    const classList = this.overlayContainer.getContainerElement().classList;
    if (classList.contains(this.activeThemeCssClass)) {
      classList.replace(this.activeThemeCssClass, this.activeTheme);
    } else {
      classList.add(this.activeTheme);
    }

    this.activeThemeCssClass = this.activeTheme;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.adminMode = params.adminMode;
    });
    this.onSetTheme();
  }
}
