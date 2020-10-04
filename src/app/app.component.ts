import {OverlayContainer} from '@angular/cdk/overlay';
import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from './api.service';
import {AuthService} from './auth/auth.service';
import {DolarService} from './dolar/dolar.service';
import {StockService} from './stocks/stocks.service';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Dados B3';

  DARK_THEME = 'app-dark-theme';
  LIGHT_THEME = 'app-light-theme';
  THEME_STORAGE_KEY = 'theme';

  @HostBinding('class') activeThemeCssClass: string;
  activeTheme = '';
  adminMode = false;
  atualizando = false;

  constructor(
    public apiService: ApiService,
    private authService: AuthService,
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

  toggleTheme() {
    if (this.activeTheme === this.DARK_THEME) {
      this.activeTheme = this.LIGHT_THEME;
    } else {
      this.activeTheme = this.DARK_THEME;
    }

    sessionStorage.setItem(this.THEME_STORAGE_KEY, this.activeTheme);
    this.setActiveThemeClass();
  }

  private setActiveThemeClass() {
    const classList = this.overlayContainer.getContainerElement().classList;
    if (classList.contains(this.activeThemeCssClass)) {
      classList.replace(this.activeThemeCssClass, this.activeTheme);
    } else {
      classList.add(this.activeTheme);
    }

    this.activeThemeCssClass = this.activeTheme;
  }

  setThemeOnInit() {
    const theme = sessionStorage.getItem(this.THEME_STORAGE_KEY);
    if (!theme) {
      sessionStorage.setItem(this.THEME_STORAGE_KEY, this.DARK_THEME);
    }
    this.activeTheme = theme;
    this.setActiveThemeClass();
  }

  isLogged(): boolean {
    return this.authService.isAuthenticated();
  }

  getFirstName(): string {
    return this.authService.getFirstName();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.adminMode = params.adminMode;
    });
    this.setThemeOnInit();
  }
}
