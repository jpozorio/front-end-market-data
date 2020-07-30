import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
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
import {DolarService} from './dolar/dolar.service';
import {DragDropDirective} from './drag-drop.directive';
import {IrCalculatorComponent} from './ir-calculator/ir-calculator.component';
import {LoginComponent} from './login/login.component';
import {StocksComponent} from './stocks/stocks.component';
import {StockService} from './stocks/stocks.service';

@NgModule({
  declarations: [
    AppComponent,
    DolarComponent,
    StocksComponent,
    IrCalculatorComponent,
    DragDropDirective,
    LoginComponent,
  ],
  imports     : [
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
    MatProgressSpinnerModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  providers   : [
    ApiService,
    HttpClientModule,
    DolarService,
    StockService,
    MatSnackBar,
  ],
  bootstrap   : [AppComponent],
})
export class AppModule {
}
