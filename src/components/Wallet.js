import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setFunds, spendMoneyById} from '../actions';

class Wallet extends Component {

  constructor(props){
    super(props);

    this.state = {
      message: '',
      changeFunds: false,
      funds_amt: 100
    };
    this.props.setFunds(this.state.funds_amt);
  }

  editFunds() {
    //console.log('edit funds')
    this.setState({
      changeFunds: !this.state.changeFunds
    })
  }

  validateFundsInput(value) {
    let valid = value.search(/^[\d]+$/);
    return (valid === 0 ? true : false);
  }

  setMessage(message) {
    this.props.setMessage(message);
  }

  setFunds(e) {
    e.preventDefault();
    //console.log('setFunds function called');
    //console.log(this.refs.funds_amt.value);
    let funds_amt = this.refs.funds_amt.value;
    let is_valid = this.validateFundsInput(funds_amt);

    if (is_valid) {
        //input is a valid number, set state:
        this.setState({
          funds_amt,
          changeFunds: false
        }, () => {
          //console.log('funds amount ' + funds_amt);
          this.props.setFunds(funds_amt);
          this.props.setMessage('New funds amount set.');
        });
    }
    else {
        //input is not a number, set error message:
        this.setMessage('Total funds must be an integer number');
    }

  }

  render(){

    let message = this.props.message;

    return(
      <div className="row text-center">
        <h2>You have <span className="label label-success">${this.props.wallet}</span> left to spend on groceries today.</h2>
        <button type="button" className={this.state.changeFunds ? 'btn btn-secondary' : 'btn btn-primary'} onClick={this.editFunds.bind(this)}>{this.state.changeFunds ? 'Cancel' : 'Set Funds'}</button>
        <form onSubmit={this.setFunds.bind(this)} className={this.state.changeFunds ? 'show' : 'hide'}>
          <h4>Enter the amount of money you have to spend in the box below:</h4>
          $ <input ref="funds_amt" type="text" size="7" maxLength="10" />
            <input type="submit" value="submit" />
        </form>
        <br />
        <h4>{message}</h4>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    wallet: state.wallet
  }
}

export default connect(mapStateToProps, {setFunds, spendMoneyById})(Wallet);
