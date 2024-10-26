import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CounterButtonsComponent } from './counter-buttons.component';
import { MatButtonModule } from '@angular/material/button';
import { increment, decrement, reset } from '../state/counter.actions';
import { By } from '@angular/platform-browser';

describe('CounterButtonsComponent', () => {
  let component: CounterButtonsComponent;
  let fixture: ComponentFixture<CounterButtonsComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterButtonsComponent, MatButtonModule],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CounterButtonsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch increment action when Increment button is clicked', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const incrementButton = fixture.debugElement.query(
      By.css('button[color="primary"]'),
    ).nativeElement;
    incrementButton.click();

    expect(dispatchSpy).toHaveBeenCalledWith(increment());
  });

  it('should dispatch decrement action when Decrement button is clicked', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const decrementButton = fixture.debugElement.query(
      By.css('button[color="warn"]'),
    ).nativeElement;
    decrementButton.click();

    expect(dispatchSpy).toHaveBeenCalledWith(decrement());
  });

  it('should dispatch reset action when Reset button is clicked', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const resetButton = fixture.debugElement.query(
      By.css('button:not([color])'),
    ).nativeElement;
    resetButton.click();

    expect(dispatchSpy).toHaveBeenCalledWith(reset());
  });
});
