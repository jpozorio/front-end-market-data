import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector   : 'app-quotes-view',
  templateUrl: './dolar.component.html',
  styleUrls  : ['./dolar.component.scss'],
})
export class DolarComponent implements OnInit {

  dataSource;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(public apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getDolarData().subscribe(resp => {
      this.dataSource = resp;
    });
  }

}
