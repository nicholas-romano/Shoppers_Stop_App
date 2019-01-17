export const SET_FUNDS = "SET_FUNDS";
export const ADD_GROCERY = "ADD_GROCERY";
export const REMOVE_GROCERY = "REMOVE_GROCERY";
export const ADD_MONEY = "ADD_MONEY";
export const SPEND_MONEY = "SPEND_MONEY";
export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";

export function addItem(grocery_list, total_items, item_name, item_cost, item_calories, item_weight) {
  const action = {
    type: ADD_ITEM,
    grocery_list,
    total_items,
    item_name,
    item_cost,
    item_calories,
    item_weight
  }
  return action;
}

export function setFunds(amount) {
  const action = {
    type: SET_FUNDS,
    amount
  }
  return action;
}

export function addGroceryById(grocery_list, id) {
  const action = {
    type: ADD_GROCERY,
    grocery_list,
    id
  }
  return action;
}

export function removeGroceryById(shopping_bag, id) {
  const action = {
    type: REMOVE_GROCERY,
    shopping_bag,
    id
  }
  return action;
}

export function addMoneyById(shopping_bag, id) {
  const action = {
    type: ADD_MONEY,
    shopping_bag,
    id
  }
  return action;
}

export function spendMoneyById(grocery_list, id) {
  const action = {
    type: SPEND_MONEY,
    grocery_list,
    id
  }
  return action;
}

export function removeItem(grocery_list, id) {
  const action = {
    type: REMOVE_ITEM,
    grocery_list,
    id
  }
  return action;
}
