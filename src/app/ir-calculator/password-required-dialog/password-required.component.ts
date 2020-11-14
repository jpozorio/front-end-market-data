import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiService} from '../../api.service';

@Component({
  selector   : 'app-password-required',
  templateUrl: './password-required.component.html',
  styleUrls  : ['./password-required.component.scss'],
})
export class PasswordRequiredComponent {

  constructor(
    public readonly snackBar: MatSnackBar,
    public readonly apiService: ApiService,
    public dialogRef: MatDialogRef<PasswordRequiredComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  okClick(): void {
    this.dialogRef.close(this.data);
  }

  onKeyUp($event: KeyboardEvent): void {
    const key = $event.key;
    if (key === 'Enter') {
      this.dialogRef.close(this.data);
    }
  }

}
