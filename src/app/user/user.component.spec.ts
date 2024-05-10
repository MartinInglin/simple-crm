import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { Firestore, FirestoreModule } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { FirebaseApp } from '@angular/fire/app';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let app: FirebaseApp;
  let firestore: Firestore;

  const firestoreStub = {
    collection: (name: string) => ({
      doc: (_id: string) => ({
        valueChanges: () => of({ foo: 'bar' }), // Returns an observable with mock data
        set: (_d: any) => Promise.resolve(null),
      }),
      snapshotChanges: () =>
        of([
          /* array of items */
        ]),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [{ provide: Firestore, useValue: firestoreStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
