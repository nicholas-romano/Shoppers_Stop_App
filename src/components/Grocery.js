import React, {Component} from 'react';
import ReactModal from 'react-modal';
import {connect} from 'react-redux';
import {addGroceryById, spendMoneyById, addItem, removeItem} from '../actions';
import groceryItemsList from '../data/groceryItems.json';
import AddItem from './AddItem';

const customStyles =  {
  content: {
    width: '400px',
    height: '400px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center'
  }
}

class Grocery extends Component {

  constructor(props){
    super(props);

    this.state = {
      masterList: groceryItemsList,
      showModal: false,
      total_items: groceryItemsList.length,
      item_to_remove: 0,
      item_name: '',
      item_cost: 25,
      item_calories: 100,
      item_weight: 250,
      duplicate_error: ''
    };
    this.addToMasterList = this.addToMasterList.bind(this);
    this.addItemToStock = this.addItemToStock.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  addToMasterList() {
    let item = {
      "id": this.state.total_items,
      "name": this.state.item_name,
      "cost": this.state.item_cost,
      "calories": this.state.item_calories,
      "weight": this.state.item_weight
    }

    let masterList = this.state.masterList;

    masterList.push(item);

    this.setState({
      masterList
    });
  }

  componentWillMount() {
    ReactModal.setAppElement('body');
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  addItemToStock(grocery_list) {
    this.props.addItem(grocery_list, this.state.total_items, this.state.item_name, this.state.item_cost, this.state.item_calories, this.state.item_weight);
  }

  checkForDuplicate(item_name) {
    //Check for duplicate names:
    var item_name_lc = item_name.toLowerCase().trim();
    var master_list = this.state.masterList;

    for (var i = 0; i < master_list.length; i++) {
      let master_list_name = master_list[i]["name"].toLowerCase();
      if (item_name_lc === master_list_name) {
        var duplicate_item = master_list_name;
      }
    }

    if (duplicate_item) {
      //duplicate found:
      return true;
    }
    else {
      //duplicate not found:
      return false;
    }

  }

  setItem(item_name) {
    var master_list = this.state.masterList;
    this.setState({
      item_name,
      total_items: this.state.total_items + 1,
      duplicate_error: ''
    }, () => {
      this.addItemToStock(master_list);
      this.addToMasterList();
    });

  }

  setCost(item_cost) {
    this.setState({
      item_cost
    });
  }

  setCalories(item_calories) {
    this.setState({
      item_calories
    });
  }

  setWeight(item_weight) {
    this.setState({
      item_weight
    });
  }

  setMessage(message) {
    this.props.setMessage(message);
  }

  confirmRemove(e) {
    e.stopPropagation();
    let item_id = e.target.id;

    this.setState({
      item_to_remove: item_id
    }, () => {
        this.handleOpenModal();
    });

  }

  deleteItem() {
    this.props.removeItem(this.props.grocery, this.state.item_to_remove);
    this.setMessage('Item removed from stock.');
    this.handleCloseModal();
  }

  render(){
    return(
      <div>
          <ReactModal
            style={customStyles}
            isOpen={this.state.showModal}
           >
            <h5>Are you sure you want to delete this item?</h5>
            <label><button className="btn btn-primary" onClick={this.deleteItem.bind(this)}>OK</button>
            <button className="btn btn-secondary" onClick={this.handleCloseModal}>Cancel</button></label>
        </ReactModal>
        <div className="grocery_container">
          <AddItem setItem={this.setItem.bind(this)}
                   setCost={this.setCost.bind(this)}
                   setCalories={this.setCalories.bind(this)}
                   setWeight={this.setWeight.bind(this)}
                   checkForDuplicate={this.checkForDuplicate.bind(this)}
                   setMessage={this.setMessage.bind(this)}
          />
          <div className="col-md-4 grocery-bg">
            <h2 className="text-center">Grocery Items</h2>
            <ul className="list-group">
                {this.props.grocery.map((item) => {
                return <li id={item.id} key={item.id}
                  className="list-group-item"
                  onClick={()=>{
                        if (this.props.wallet - item.cost >= 0) {
                          this.props.addGroceryById(this.props.grocery, item.id);
                          this.props.spendMoneyById(this.props.grocery, item.id);
                          this.setMessage('Item purchased successfully.');
                        }
                        else {
                          this.setMessage('You do not have enough money left to buy that.');
                        }
                    }
                  }>
                    <b>{item.name}</b>
                    - <span className="label label-info">${item.cost}</span>
                    - <span className="label label-warning">{item.calories} kcal</span>
                    - <span className="label label-primary">{item.weight} mg</span>
                    <button id={item.id} type="button"
                    title="Remove this item"
                    className="remove-item"
                     onClick={this.confirmRemove.bind(this)}>X</button>
                    </li>
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    grocery: state.grocery,
    wallet: state.wallet
  }
}

export default connect(mapStateToProps, {addGroceryById, spendMoneyById, addItem, removeItem}) (Grocery);
