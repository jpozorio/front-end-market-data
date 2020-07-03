import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';

@Component({
  selector   : 'app-ir-calculator',
  templateUrl: './ir-calculator.component.html',
  styleUrls  : ['./ir-calculator.component.scss'],
})
export class IrCalculatorComponent {

  fileToUpload: File = null;
  brutoDayTrade: 0.00;
  liquidoDayTrade: 0.00;
  impostoRetido: 0.00;
  impostoTotal: 0.00;

  constructor(public httpClient: HttpClient) {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  postFile(fileToUpload: File): void {
    const endpoint = '/market-data/ir-calculator/calculate';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.httpClient
        .post(endpoint, formData, {}).subscribe((resp: any) => {
        this.brutoDayTrade = resp.brutoDayTrade;
        this.liquidoDayTrade = resp.liquidoDayTrade;
        this.impostoRetido = resp.impostoRetido;
        this.impostoTotal = resp.impostoTotal;
      },
    )
    ;
  }
}
