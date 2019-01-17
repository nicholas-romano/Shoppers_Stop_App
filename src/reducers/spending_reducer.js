import {SET_FUNDS, ADD_MONEY, SPEND_MONEY} from '../actions';
import {addToBag, removeFromBag} from './helper';

export default function wallet(state = null, action) {
  let item, wallet;
  switch(action.type) {
    case SET_FUNDS:
      state = parseInt(action.amount, 10);
      wallet = state;
      //console.log('Funds set to: ' + action.amount);
      return wallet;
    case ADD_MONEY:
      item = removeFromBag(action.shopping_bag, action.id);
      wallet = state + item.cost;
      //console.log("Money added to wallet.");
      return wallet;
    case SPEND_MONEY:
      item = addToBag(action.grocery_list, action.id);
      wallet = state - item.cost;
      //console.log("Money spent.");
      return wallet;
    default:
      return state;
  }
}
