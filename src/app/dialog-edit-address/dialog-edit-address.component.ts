import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../models/user.class';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    MatButtonModule,
    MatProgressBar,
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss',
})
export class DialogEditAddressComponent {
  public user: User | null = null;
  public userId: string = '';
  public isLoading = false;
  private firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {}

  saveUser() {
    if (this.user) {
      this.isLoading = true;
      const userDocumentRef = doc(this.firestore, 'users', this.userId);
      setDoc(userDocumentRef, this.user.toJSON()).then((result: any) => {
        this.isLoading = false;
        this.dialogRef.close();
      });
    }
  }
}
