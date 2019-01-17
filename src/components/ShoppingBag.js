import React, {Component} from 'react';
import {connect} from 'react-redux';
import {removeGroceryById, addMoneyById} from '../actions';

class ShoppingBag extends Component {

  setMessage(message) {
    this.props.setMessage(message);
  }

  displayShoppingBag() {
    if (this.props.shoppingBag.length > 0) {
      return (
        <ul className="list-group">
          {this.props.shoppingBag.map((item) => {
            return <li key={item.id}
              className="list-group-item"
              onClick={()=>{
                this.props.removeGroceryById(this.props.shoppingBag, item.id);
                this.props.addMoneyById(this.props.shoppingBag, item.id);
                this.setMessage('Item returned. Money reimbursed to your wallet.');
              }
            }><b>{item.name}</b>
              - <span className="label label-info">${item.cost}</span>
              - <span className="label label-warning">{item.calories} kcal</span>
              - <span className="label label-primary">{item.weight} mg</span></li>
          })}
        </ul>
      )
    }
    else {
      return (
        <ul className="list-group">
            <li className="list-group-item">No items added to the bag.</li>
        </ul>
      )
    }
  }

  render(){
    return(
      <div className="col-md-4 shopping-bag-bg">
        <h2 className="text-center">Shopping Bag Items</h2>
        {this.displayShoppingBag()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    shoppingBag: state.shoppingBag,
    wallet: state.wallet
  }
}

export default connect(mapStateToProps, {removeGroceryById, addMoneyById}) (ShoppingBag);
