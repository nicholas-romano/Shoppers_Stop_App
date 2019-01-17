export function addToBag(grocery_list, id) {
  let item = grocery_list.find((grocery_list)=> grocery_list.id === id);
  return item;
}

export function removeFromBag(shopping_bag, id) {
  let item = shopping_bag.find((shopping_bag)=> shopping_bag.id === id);
  return item;
}

export function addToStock(grocery_list, total_items, name, cost, calories, weight) {
  let new_id = total_items++;
  cost = parseInt(cost, 10);
  calories = parseInt(calories, 10);
  weight = parseInt(weight, 10);

  let item = {"id": new_id, "name": name, "cost": cost, "calories": calories, "weight": weight}
  return item;
}
