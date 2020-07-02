import {Component, OnInit} from '@angular/core';
import {DolarService} from './dolar.service';

@Component({
  selector   : 'app-quotes-view',
  templateUrl: './dolar.component.html',
  styleUrls  : ['./dolar.component.scss'],
})
export class DolarComponent implements OnInit {

  displayedColumns: string[] = [
    'day',
    'instrument',
    'first_price',
    'min_price',
    'max_price',
    'ajuste',
    'last_price',
  ];

  constructor(
    public dolarService: DolarService,
  ) {
  }

  ngOnInit(): void {
    this.dolarService.subscribeDolarData();
  }

  get dataSource() {
    return this.dolarService.dataSource;
  }

  get currentContract() {
    return this.dolarService.currentContract;
  }

  get maxPrice() {
    return this.dolarService.maxPrice;
  }

  get minPrice() {
    return this.dolarService.minPrice;
  }

  get variations(): any[] {
    return this.dolarService.variations;
  }

  get variationsLastPrice(): any[] {
    return this.dolarService.variationsLastPrice;
  }

  get variationsAjuste(): any[] {
    return this.dolarService.variationsAjuste;
  }

  get selectedRowIndex(): number {
    return this.dolarService.selectedRowIndex;
  }

  fillVariatinsData(row): void {
    return this.dolarService.fillVariatinsData(row);
  }

}
