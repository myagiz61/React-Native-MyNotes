import {createStore, combineReducers} from 'redux';
import {noteReducer} from './reducers/noteReducer';

const rootReducer = combineReducers({
  notesState: noteReducer,
});

export const store = createStore(rootReducer);
