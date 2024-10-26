import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { provideMockStore } from '@ngrx/store/testing';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        DashboardComponent,
        MatGridListModule,
        MatToolbarModule,
        MatCardModule,
        BrowserAnimationsModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tiles on ngOnInit', () => {
    const expectedTiles = [
      {
        text: 'One',
        cols: 4,
        rows: 1,
        color: '#D0E6D8',
        template: 'templateOne',
      },
      {
        text: 'Two',
        cols: 4,
        rows: 4,
        color: '#D0E6D8',
        template: 'templateTwo',
      },
      {
        text: 'Three',
        cols: 4,
        rows: 6,
        color: '#F4B6C2',
        template: 'templateThree',
      },
      {
        text: 'Four',
        cols: 2,
        rows: 6,
        color: '#A4D8E1',
        template: 'templateFour',
      },
      {
        text: 'Five',
        cols: 2,
        rows: 6,
        color: '#f8f3e8',
        template: 'templateFive',
      },
    ];
    expect(component.tiles).toEqual(expectedTiles);
  });

  it('should cycle through wallpapers every 5 seconds', fakeAsync(() => {
    component.ngOnInit();
    const initialSlide = component.currentSlide;
    tick(5100);

    expect(component.currentSlide).toBe(
      (initialSlide + 1) % component.wallpapers.length,
    );
    component.ngOnDestroy();
  }));

  it('should clear the interval on ngOnDestroy', () => {
    const clearSpy = spyOn(window, 'clearInterval').and.callThrough();
    component.ngOnDestroy();
    expect(clearSpy).toHaveBeenCalled();
  });

  it('should have a default checked and disabled state for slide toggle', () => {
    expect(component.checked).toBeFalse();
    expect(component.disabled).toBeFalse();
  });
});
