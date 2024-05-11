import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  const firestoreStub = {
    collection: (name: string) => ({
      doc: (_id: string) => ({
        valueChanges: () => of({ foo: 'bar' }), // Returns an observable with mock data
        set: (_d: any) => Promise.resolve(null),
      }),
      snapshotChanges: () => of([ /* Mock data array */ ]),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent], // If UserComponent is standalone, use imports instead
      providers: [
        { provide: Firestore, useValue: firestoreStub },
        provideFirebaseApp(() => initializeApp({
          projectId: 'simple-crm-e2c5c',
          appId: '1:488148744412:web:8e76dfa27226c50af85c19',
          storageBucket: 'simple-crm-e2c5c.appspot.com',
          apiKey: 'AIzaSyDxRshuMnonuLYicWhOAsHmpd3QTH6-hrc',
          authDomain: 'simple-crm-e2c5c.firebaseapp.com',
          messagingSenderId: '488148744412',
        })),
        provideFirestore(() => getFirestore()), // This should be reviewed if stub is used
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
