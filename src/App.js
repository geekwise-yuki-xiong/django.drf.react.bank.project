// frontend/src/App.js

import React, { Component } from "react";
import Modal from "./components/branchModal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        bank_name: "",
        location: "",
      },
      branchList: [],
      branchActive: true,
      customerActive: false,
      productActive: false,
      accountActive: false
      // And so on...

    };
  }
  componentDidMount() {
    this.refreshList();
  };
  refreshList = () => {
    axios
      .get("https://backend-bank-yuki.herokuapp.com/bank/branches/")
      .then(res => this.setState({ branchList: res.data.results }))
      .catch(err => console.log(err));
  };

  displayBranch = status => {
    if (status) {
      console.log("show branch models")
      return this.setState({ 
        branchActive: true,
        customerActive: false,
        productActive: false,
        accountActive: false
       });
    }
    return this.setState({ branchActive: false });
  };

  displayCustomer = status => {
    if (status) {
      console.log("show customer models")
      return this.setState({ 
        branchActive: false,
        customerActive: true,
        productActive: false,
        accountActive: false
       });
    }
    return this.setState({ customerActive: false });
  };

  displayProduct = status => {
    if (status) {
      console.log("show product models")
      return this.setState({ 
        branchActive: false,
        customerActive: false,
        productActive: true,
        accountActive: false
       });
    }
    return this.setState({ productActive: false });
  };

  displayAccount = status => {
    if (status) {
      console.log("show account models")
      return this.setState({ 
        branchActive: false,
        customerActive: false,
        productActive: false,
        accountActive: true
       });
    }
    return this.setState({ accountActive: false });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayBranch(true)}
          className={this.state.branchActive ? "active" : ""}
        >
          Branches
        </span>
        <span
          onClick={() => this.displayCustomer(true)}
          className={this.state.customerActive ? "active" : ""}
        >
          Customers
        </span>
        <span
          onClick={() => this.displayProduct(true)}
          className={this.state.productActive ? "active" : ""}
        >
          Products
        </span>
        <span
          onClick={() => this.displayAccount(true)}
          className={this.state.accountActive ? "active" : ""}
        >
          Accounts
        </span>
      </div>
    );
  };
  renderItems = () => {
  //  const { viewCompleted } = this.state;
  //  const newItems = this.state.todoList.filter(
  //    item => item.completed === viewCompleted
  //  );
  // --> FILTER THE DESIRED MODEL
  const newItems = this.state.branchList
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.bank_name}
        >
          {item.bank_name}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            {" "}
            Edit{" "}
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete{" "}
          </button>
        </span>
      </li>
    ));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`https://backend-bank-yuki.herokuapp.com/bank/branches/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("https://backend-bank-yuki.herokuapp.com/bank/branches/", item)
      .then(res => this.refreshList());
  };
  handleDelete = item => {
    axios
      .delete(`https://backend-bank-yuki.herokuapp.com/bank/branches/${item.id}`)
      .then(res => this.refreshList());
  };
  createItem = () => {
    const item = { bank_name: "", location: ""};
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Bank App</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Add item
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;