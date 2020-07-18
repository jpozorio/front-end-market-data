import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';

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
export class IrCalculatorComponent {

  fileToUpload: File = null;
  files: any[] = [];
  dayTradeSummaryDays: DaySummary[] = [];
  total: DaySummary;
  processando = false;

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

  uploadFile(event) {
    this.fileToUpload = event[0];
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element);
    }
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
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
        this.processando = false;
      },
    )
    ;
  }
}
