import React, {Component} from 'react';
import ReactModal from 'react-modal';

class AddItem extends Component {

  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      nameError: false,
      item_name: '',
      item_cost: 25,
      item_calories: 100,
      item_weight: 250,
      duplicate_error: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentWillMount() {
    ReactModal.setAppElement('body');
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({
      showModal: false,
      nameError: false,
      duplicate_error: false,
      item_name: '',
      item_cost: 25,
      item_calories: 100,
      item_weight: 250
    });
    this.refs.item_name.value = '';
  }

  validateInput(e) {
    let item_input = e.target.value;
    let entry = item_input.search(/^[-'\w\s]+$/);

    if (entry === 0) {
      //valid entry format:
      this.setState({
        nameError: false,
        item_name: item_input
      });
    }
    else {
      //invalid entry format:
      this.setState({
        nameError: true
      });
    }

    //check for duplicates:
    var duplicate = this.checkForDuplicate(item_input);

    if (duplicate) {
      //duplicate found:
      this.setState({
        duplicate_error: true
      });
    }
    else {
      //duplicate not found:
      this.setState({
        duplicate_error: false
      });
    }

  }

  setCost(e) {
    this.setState({
      item_cost: e.target.value
    });
  }

  setCalories(e) {
    this.setState({
      item_calories: e.target.value
    });
  }

  setWeight(e) {
    this.setState({
      item_weight: e.target.value
    });
  }

  handleItemSubmission(e) {
    e.preventDefault();
    let item_name = this.refs.item_name.value;
    let item_cost = this.refs.item_cost.value;
    let item_calories = this.refs.item_calories.value;
    let item_weight = this.refs.item_weight.value;

    //if there is not a name error nor a duplicate error, submit the data:
    if (this.state.nameError === false && this.state.duplicate_error === false) {
      this.props.setItem(item_name);
      this.props.setCost(item_cost);
      this.props.setCalories(item_calories);
      this.props.setWeight(item_weight);
      this.props.setMessage('New item created and added to stock.');
      this.handleCloseModal();
    }

  }

  checkForDuplicate(item_name) {
    var duplicate = this.props.checkForDuplicate(item_name);
    return duplicate;
  }

  duplicateError(duplicate_name) {
    this.setState({
      duplicate_error: duplicate_name
    });
  }

  render(){

    return(
      <div>
        <button id="add-item" type="button" className="btn btn-primary add-item" onClick={this.handleOpenModal}>Add Item</button>
        <ReactModal
           isOpen={this.state.showModal}
        >
          <h2>Add Item To Grocery Store</h2>
          <form onSubmit={this.handleItemSubmission.bind(this)}>
            <div className="form-group">
              <label htmlFor="item_name">Item name:</label>
              <input ref="item_name" type="text" className="form-control" id="item_name" onChange={this.validateInput.bind(this)}  />
              <p className={this.state.nameError ? 'show' : 'hide'}><span className="error">Name field must be alphanumeric.</span></p>
              <p className={this.state.duplicate_error ? 'show' : 'hide'}><span className="error">That item already exists. Please choose a different name.</span></p>
            </div>
            <div className="slidecontainer">
              <label>Cost:</label>
              <input ref="item_cost" type="range" min="1" max="100" defaultValue={this.state.item_cost} onChange={this.setCost.bind(this)} className="slider" id="item_cost"  />
              <p>$<span id="cost-output">{this.state.item_cost}</span></p>
            </div>
            <div className="slidecontainer">
              <label>Calories:</label>
              <input ref="item_calories" type="range" min="1" max="1000" defaultValue={this.state.item_calories} onChange={this.setCalories.bind(this)} className="slider" id="item_calories"  />
              <p><span id="cost-output">{this.state.item_calories}</span> kcal</p>
            </div>
            <div className="slidecontainer">
              <label>Weight:</label>
              <input ref="item_weight" type="range" min="1" max="1000" defaultValue={this.state.item_weight} onChange={this.setWeight.bind(this)} className="slider" id="item_weight"  />
              <p><span id="cost-output">{this.state.item_weight}</span> mg</p>
            </div>
            <button type="submit" className="btn btn-primary">Add Item</button>
          </form>
          <button id="close-add-item" className="btn btn-secondary" onClick={this.handleCloseModal}>Cancel</button>
        </ReactModal>
      </div>
    );
  }
}

export default AddItem;
