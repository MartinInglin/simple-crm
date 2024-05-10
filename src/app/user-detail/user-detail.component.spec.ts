import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

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

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: (key: string) => 'someDefaultValue', // Customize this as necessary
      },
      queryParamMap: {
        get: (key: string) => 'someQueryValue', // Customize this as necessary
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock, // Use the mock defined earlier
        },
        { provide: Firestore, useValue: firestoreStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
