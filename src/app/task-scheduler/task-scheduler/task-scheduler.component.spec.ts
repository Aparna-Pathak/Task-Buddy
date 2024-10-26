import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskSchedulerComponent } from './task-scheduler.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Task } from '../model/task';
import {
  addTask,
  deleteTask,
  editTask,
  saveTask,
} from '../store/actions/task.actions';
import { selectAllTasks } from '../store/selectors/task.selector';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import here

describe('TaskSchedulerComponent', () => {
  let component: TaskSchedulerComponent;
  let fixture: ComponentFixture<TaskSchedulerComponent>;
  let store: MockStore;

  const initialState = {
    task: {
      tasks: [] as Task[],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskSchedulerComponent, BrowserAnimationsModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TaskSchedulerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should select all tasks from the store', () => {
    const tasks: Task[] = [
      {
        id: 1,
        title: 'Task 1',
        date: '2023-10-22T00:00:00.000Z',
        isEditing: false,
      },
      {
        id: 2,
        title: 'Task 2',
        date: '2023-10-22T00:00:00.000Z',
        isEditing: false,
      },
    ];

    // Override the selector
    store.overrideSelector(selectAllTasks, tasks);

    fixture.detectChanges(); // Trigger change detection

    // Subscribe to the observable and test if the tasks are fetched correctly
    component.tasks$.subscribe((data) => {
      expect(data).toEqual(tasks);
    });
  });

  it('should add a task', () => {
    const newTaskTitle = 'New Task';
    const newTaskDate = new Date();
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      date: newTaskDate.toISOString(),
      isEditing: false,
    };

    component.newTaskTitle = newTaskTitle;
    component.newTaskDate = newTaskDate;

    // Spy on store.dispatch
    spyOn(store, 'dispatch');

    component.addTask();

    // Expect dispatch to have been called with the correct action
    expect(store.dispatch).toHaveBeenCalledWith(addTask({ task: newTask }));
  });

  it('should not add a task if the title is empty', () => {
    component.newTaskTitle = '';
    component.newTaskDate = new Date();

    // Spy on store.dispatch
    spyOn(store, 'dispatch');

    component.addTask();

    // Expect dispatch not to be called
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should not add a task if the date is not selected', () => {
    component.newTaskTitle = 'Task with No Date';
    component.newTaskDate = null;

    spyOn(store, 'dispatch');

    component.addTask();

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should edit a task', () => {
    const task: Task = {
      id: 1,
      title: 'Task to Edit',
      date: '2023-10-22T00:00:00.000Z',
      isEditing: false,
    };

    spyOn(store, 'dispatch');

    component.editTask(task);

    expect(component.editingTask).toEqual(task);

    expect(store.dispatch).toHaveBeenCalledWith(
      editTask({ task: { ...task, isEditing: true } }),
    );
  });

  it('should save the editing task', () => {
    const task: Task = {
      id: 1,
      title: 'Task to Save',
      date: '2023-10-22T00:00:00.000Z',
      isEditing: true,
    };

    component.editingTask = task;

    spyOn(store, 'dispatch');

    component.saveTask();

    expect(store.dispatch).toHaveBeenCalledWith(saveTask({ task }));

    expect(component.editingTask).toBeNull();
  });

  it('should delete a task', () => {
    const taskId = 1;

    spyOn(store, 'dispatch');

    component.deleteTask(taskId);

    expect(store.dispatch).toHaveBeenCalledWith(deleteTask({ id: taskId }));
  });
});
