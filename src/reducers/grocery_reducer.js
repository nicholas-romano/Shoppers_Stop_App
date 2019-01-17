import {ADD_GROCERY, REMOVE_GROCERY, ADD_ITEM, REMOVE_ITEM} from '../actions';
import {removeFromBag, addToStock} from './helper';
import groceryItemsList from '../data/groceryItems.json';

export default function grocery(state = groceryItemsList, action) {
  switch(action.type) {
    case ADD_GROCERY:
      let grocery = action.grocery_list.filter(grocery_list=>grocery_list.id !== action.id);
      return grocery;
    case REMOVE_GROCERY:
      grocery = [...state, removeFromBag(action.shopping_bag, action.id)];
      return grocery;
    case ADD_ITEM:
      grocery = [...state, addToStock(action.grocery_list, action.total_items, action.item_name, action.item_cost, action.item_calories, action.item_weight)];
      return grocery;
    case REMOVE_ITEM:
      let id = parseInt(action.id, 10);
      grocery = action.grocery_list.filter(grocery_list=>grocery_list.id !== id);
      return grocery;
    default:
      return state;
  }
}
