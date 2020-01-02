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
      customers: this.props.customers,

    };
  }
  handleChange = e => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem.balance, [name]: value };
    this.setState({ activeItem });
  };
  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Account </ModalHeader>
        <ModalBody>
          <Form>
            {/* <FormGroup>
              <Label style={{position: 'relative', bottom: '5px', paddingRight: '13px'}} for="holder">Account Holder</Label>
              <select name="holder">
                {this.state.customers.map((value, index) => {
                    return <option key={index} value={value}>{value.name} | {value.email}</option>
                  })
                }
              </select>
            </FormGroup> */}
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