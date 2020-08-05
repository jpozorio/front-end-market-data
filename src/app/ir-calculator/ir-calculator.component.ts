import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector   : 'app-ir-calculator',
  templateUrl: './ir-calculator.component.html',
  styleUrls  : ['./ir-calculator.component.scss'],
})
export class IrCalculatorComponent implements OnInit, OnDestroy {

  files: any[] = [];
  processando = false;
  droping = false;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly route: Router,
    public readonly snackBar: MatSnackBar,
    public readonly apiService: ApiService,
  ) {
    this.processando = false;
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
    this.processando = true;

    this.apiService
        .postFiles(this.files).subscribe((resp: any) => {

        if (resp.fileRequirePassword === true) {
          this.snackBar.open('fileRequirePassword!');
        } else if (resp === true) {
          this.route.navigate(['ir-list']);
        } else {
          this.snackBar.open('Falha no engano!');
        }

        this.processando = false;
      },
    )
    ;
  }
}
