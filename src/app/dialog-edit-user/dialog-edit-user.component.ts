import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBar } from '@angular/material/progress-bar';
import { User } from '../models/user.class';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    MatProgressBar,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent {
  user: User = new User;
  birthDate!: Date;
  public isLoading = false;
  public userId: string = '';
  private firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {}

  saveUser() {
    if (this.user) {
      this.user.birthDate = this.birthDate.getTime();
      this.isLoading = true;
      const userDocumentRef = doc(this.firestore, 'users', this.userId);
      setDoc(userDocumentRef, this.user.toJSON()).then((result: any) => {
        this.isLoading = false;
        this.dialogRef.close();
      });
    }
  }
}
