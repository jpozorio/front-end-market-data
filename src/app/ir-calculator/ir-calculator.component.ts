import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {PasswordRequiredComponent} from './password-required-dialog/password-required.component';

@Component({
  selector   : 'app-ir-calculator',
  templateUrl: './ir-calculator.component.html',
  styleUrls  : ['./ir-calculator.component.scss'],
})
export class IrCalculatorComponent implements OnInit, OnDestroy {

  files: any[] = [];
  processando = false;
  uploading = false;
  importing = false;
  droping = false;
  filePassword = '';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly route: Router,
    public readonly snackBar: MatSnackBar,
    public readonly apiService: ApiService,
    public dialog: MatDialog,
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
    this.uploading = true;

    this.apiService
        .postFiles(this.files).subscribe((resp: any) => {
        this.uploading = false;

        if (resp.password_required === true) {
          this.openDialog();
        } else if (resp.password_required === false) {
          this.processFiles();
        } else {
          this.processando = false;
          this.snackBar.open('Falha no engano!', null, {duration: 2});
        }
      },
    )
    ;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PasswordRequiredComponent, {
      width: '250px',
      data : {filePassword: this.filePassword},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.filePassword = result.filePassword;
      this.processFiles();
    });
  }

  private processFiles() {
    this.importing = true;
    this.apiService.processFiles(this.filePassword)
        .subscribe((resp: any) => {
          if (resp === true) {
            this.route.navigate(['ir-month-list']);
            this.snackBar.open('Arquivos processados com sucesso!', null, {duration: 2});
          } else {
            this.snackBar.open('Falha no engano!', null, {duration: 2});
          }

          this.processando = false;
          this.importing = false;
        });
  }
}
