import {ADD_GROCERY, REMOVE_GROCERY} from '../actions';
import {addToBag} from './helper';

export default function shoppingBag(state = [], action) {
  switch(action.type) {
    case ADD_GROCERY:
      let shoppingBag = [...state, addToBag(action.grocery_list, action.id)];
      return shoppingBag;
    case REMOVE_GROCERY:
      shoppingBag = action.shopping_bag.filter((item)=>item.id !== action.id);
      return shoppingBag
    default:
      return state;
  }
}
