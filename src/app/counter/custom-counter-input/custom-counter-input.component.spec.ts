import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CustomCounterInputComponent } from './custom-counter-input.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { changeStateName, customIncrement } from '../state/counter.actions';
import { getStateName } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CustomCounterInputComponent', () => {
  let component: CustomCounterInputComponent;
  let fixture: ComponentFixture<CustomCounterInputComponent>;
  let store: MockStore;

  const initialState = {
    counter: {
      counter: 0,
      stateName: 'Default State',
    } as CounterState,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule,
        CustomCounterInputComponent, // Include the standalone component
      ],
      providers: [
        provideMockStore({ initialState }), // Provide the mock store with the initial state
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CustomCounterInputComponent);
    component = fixture.componentInstance;

    // Mock the selector for the stateName
    store.overrideSelector(getStateName, 'Default State');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have stateName$ initialized with the selector value', (done: DoneFn) => {
    component.stateName$.subscribe((name) => {
      expect(name).toBe('Default State');
      done();
    });
  });

  it('should dispatch customIncrement action when onAdd is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.value = 5; // Set a value for testing
    component.onAdd(); // Call the method to trigger the action
    expect(dispatchSpy).toHaveBeenCalledWith(customIncrement({ count: 5 })); // Assert that the action was dispatched correctly
  });

  it('should dispatch changeStateName action when onChangeStateName is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onChangeStateName(); // Call the method to trigger the action
    expect(dispatchSpy).toHaveBeenCalledWith(changeStateName()); // Assert that the action was dispatched correctly
  });
});
