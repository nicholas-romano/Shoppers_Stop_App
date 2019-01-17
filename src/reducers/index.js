import {combineReducers} from 'redux';
import grocery from './grocery_reducer';
import shoppingBag from './shoppingBag_reducer';
import wallet from './spending_reducer';

const rootReducer = combineReducers({
  grocery,
  shoppingBag,
  wallet
});

export default rootReducer;
