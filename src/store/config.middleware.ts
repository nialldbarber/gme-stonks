import {RootState} from './index';

export function saveStateToLocalStorage(state: RootState): void {
  try {
    const serialisedState = JSON.stringify(state);
    if (serialisedState === null) return undefined;
    localStorage.setItem('state', serialisedState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export function loadStateFromLocalStorage(): any {
  try {
    const serialisedState = localStorage.getItem('state');
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
