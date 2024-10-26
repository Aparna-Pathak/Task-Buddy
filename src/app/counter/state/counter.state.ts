export interface CounterState {
  counter: number;
  stateName: string;
}
export const initialState: CounterState = {
  counter: 4,
  stateName: 'Work In Progress',
};
