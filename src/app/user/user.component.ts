import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  users$: Observable<User[]>;
  user: User;
  allUsers: [] = [];
  private subscription: Subscription = new Subscription();
  private firestore = inject(Firestore)

  constructor(public dialog: MatDialog) {
    this.users$ = collectionData(this.getUsersRef(), {
      idField: 'id',
    }) as Observable<User[]>;
    this.user = new User();
  }

  ngOnInit(): void {
    this.subscription = this.users$.subscribe((userList) => {
      userList.forEach((user) => {
        this.user = user;
        console.log(user);
      });
    });
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
