import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CounterOutputComponent } from './counter-output.component';
import { getCounter } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';
import { CommonModule } from '@angular/common';

describe('CounterOutputComponent', () => {
  let component: CounterOutputComponent;
  let fixture: ComponentFixture<CounterOutputComponent>;
  let store: MockStore;

  const initialState = {
    counter: {
      counter: 5,
    } as CounterState,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterOutputComponent, CommonModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CounterOutputComponent);
    component = fixture.componentInstance;

    store.overrideSelector(getCounter, initialState.counter.counter);

    component.counter$ = store.select(getCounter);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should select the counter from the store', (done: DoneFn) => {
    component.counter$.subscribe((value) => {
      expect(value).toBe(initialState.counter.counter);
      done();
    });
    fixture.detectChanges();
  });

  it('should display the correct accomplishment message', () => {
    fixture.detectChanges();

    const messageElement: HTMLElement = fixture.nativeElement.querySelector(
      '.accomplishment-message',
    );
    expect(messageElement.textContent).toContain(
      'Well done, you have accomplished 5 tasks!',
    );
  });
});
