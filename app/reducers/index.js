import { combineReducers } from 'redux';

import referenceReducer from './Reference_Reducer';
import uiReducer from './UI_Reducer';

export default combineReducers({
    references: referenceReducer,
    ui: uiReducer
})