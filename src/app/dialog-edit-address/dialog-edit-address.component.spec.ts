import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditAddressComponent } from './dialog-edit-address.component';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogEditAddressComponent', () => {
  let component: DialogEditAddressComponent;
  let fixture: ComponentFixture<DialogEditAddressComponent>;

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
      imports: [DialogEditAddressComponent, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}, // Adjust this mock as necessary
        },
        { provide: Firestore, useValue: firestoreStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
