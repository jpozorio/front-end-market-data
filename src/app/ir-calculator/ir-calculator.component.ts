import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';

interface DaySummary {
  day;
  brutoDayTrade: 0.00;
  liquidoDayTrade: 0.00;
  impostoRetido: 0.00;
  impostoTotal: 0.00;
}

@Component({
  selector   : 'app-ir-calculator',
  templateUrl: './ir-calculator.component.html',
  styleUrls  : ['./ir-calculator.component.scss'],
})
export class IrCalculatorComponent implements OnInit, OnDestroy {

  files: any[] = [];
  dayTradeSummaryDays: DaySummary[] = [];
  total: DaySummary;
  processando = false;
  droping = false;

  displayedColumns: string[] = [
    'day',
    'brutoDayTrade',
    'liquidoDayTrade',
    'impostoRetido',
    'impostoTotal',
    'impostoDevido',
  ];

  constructor(public httpClient: HttpClient) {
    this.processando = false;
    this.total = {
      day            : null,
      brutoDayTrade  : 0.00,
      liquidoDayTrade: 0.00,
      impostoRetido  : 0.00,
      impostoTotal   : 0.00,
    };
  }

  ngOnDestroy(): void {
    window.removeEventListener('dragenter', e => {
      this.droping = false;
    });
  }

  ngOnInit(): void {
    window.addEventListener('dragenter', e => {
      this.droping = true;
    });
  }

  uploadFileAllPage(event) {
    // event.dataTransfer.dropEffect = 'copy';
    event.preventDefault();
    for (const file of event.dataTransfer.files) {
      this.files.push(file);
    }
    this.droping = false;
  }

  uploadFile(event) {
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element);
    }
  }

  allowDrag($event: DragEvent) {
    // event.dataTransfer.dropEffect = 'copy';
    $event.preventDefault();
  }

  dragLeave($event: DragEvent) {
    this.droping = false;
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
  }

  clearFiles(): void {
    this.files = [];
  }

  postFiles(): void {
    const endpoint = '/market-data/ir-calculator/calculate';
    const formData: FormData = new FormData();
    this.processando = true;

    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.files.length; index++) {
      const currentFile = this.files[index];
      formData.append('file', currentFile, currentFile.name);
    }

    this.httpClient
        .post(endpoint, formData, {}).subscribe((resp: any) => {
        this.total = {
          day            : null,
          brutoDayTrade  : 0.00,
          liquidoDayTrade: 0.00,
          impostoRetido  : 0.00,
          impostoTotal   : 0.00,
        };

        for (const el of resp) {
          const item: DaySummary = {
            day            : el.day,
            brutoDayTrade  : el.brutoDayTrade,
            liquidoDayTrade: el.liquidoDayTrade,
            impostoRetido  : el.impostoRetido,
            impostoTotal   : el.impostoTotal,
          };

          this.total.brutoDayTrade += item.brutoDayTrade;
          this.total.liquidoDayTrade += item.liquidoDayTrade;
          this.total.impostoRetido += item.impostoRetido;
          this.total.impostoTotal += item.impostoTotal;

          this.dayTradeSummaryDays.push(item);
        }
        this.dayTradeSummaryDays.push(this.total);
        this.processando = false;
      },
    )
    ;
  }
}
