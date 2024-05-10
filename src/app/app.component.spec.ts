import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

describe('AppComponent', () => {

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: (key: string) => 'someDefaultValue',  // Customize this as necessary
      },
      queryParamMap: {
        get: (key: string) => 'someQueryValue',  // Customize this as necessary
      }
    }
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NoopAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock  // Use the mock defined earlier
        },
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
