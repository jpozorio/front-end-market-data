import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DolarComponent} from './dolar/dolar.component';
import {IrCalculatorComponent} from './ir-calculator/ir-calculator.component';
import {LoginComponent} from './login/login.component';
import {StocksComponent} from './stocks/stocks.component';

const routes: Routes = [
  {path: '', component: DolarComponent},
  {path: 'dolar', component: DolarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'stocks', component: StocksComponent},
  {path: 'ir-calculator', component: IrCalculatorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
