import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      branches: this.props.branches,
      customers: this.props.customers
    };
  }
  handleChange = e => {
    let { name, value } = e.target;
    let activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };
  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Account </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label style={{position: 'relative', bottom: '5px', paddingRight: '13px'}} for="bank_partner">Bank Partner</Label>
              <select type="text" name="bank_partner" onChange={this.handleChange}>
                {this.state.branches.map((value, index) => {
                    return <option key={index} value={value.bank_name}>{value.bank_name}</option>
                  })
                }
              </select>
            </FormGroup>
            <FormGroup>
              <Label style={{position: 'relative', bottom: '5px', paddingRight: '13px'}} for="holder">Account Holder</Label>
              <select type="text" name="holder" onChange={this.handleChange}>
                {this.state.customers.map((value, index) => {
                    return <option key={index} value={value.name}>{value.name} | {value.email}</option>
                  })
                }
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="balance">Balance</Label>
              <Input
                type="text"
                name="balance"
                value={this.state.activeItem.balance}
                onChange={this.handleChange}
                placeholder="Your balance"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}