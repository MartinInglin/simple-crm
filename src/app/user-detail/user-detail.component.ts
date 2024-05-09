import { Component } from '@angular/core';
import {
  Firestore,
  Unsubscribe,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  public userId: string = '';
  private unsubscribeUser: Unsubscribe | null = null;
  public userData: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      console.error('User ID is missing in the URL');
    } else {
      this.userId = id;
      this.getUser();
    }
  }

  getUser() {
    const userDocRef = doc(this.firestore, 'users', this.userId);
    this.unsubscribeUser = onSnapshot(userDocRef, (doc) => {
      const data = doc.data();
      if (data) {
        this.userData = data as User;
        console.log('Current data: ', this.userData);
      } else {
        console.log('No user data found.');
        this.userData = null;
      }
    });
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.userData);
    dialog.componentInstance.userId = this.userId;
  }

  editAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.userData);
    dialog.componentInstance.userId = this.userId;
  }

  ngOnDestroy() {
    if (this.unsubscribeUser) {
      this.unsubscribeUser();
    }
  }
}
