import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {ApiService} from './api.service';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DolarComponent} from './dolar/dolar.component';
import {IrCalculatorComponent} from './ir-calculator/ir-calculator.component';
import {StocksComponent} from './stocks/stocks.component';

@NgModule({
  declarations: [
    AppComponent,
    DolarComponent,
    StocksComponent,
    IrCalculatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatCardModule,
  ],
  providers   : [
    ApiService,
    HttpClientModule,
  ],
  bootstrap   : [AppComponent],
})
export class AppModule {
}
