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
    };
  }
  handleChange = e => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };
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
              <Label for="bank_partner">Bank Partner</Label>
              <Input
                type="text"
                name="bank_partner"
                value={this.state.activeItem.bank_partner}
                onChange={this.handleChange}
                placeholder="Your bank partner"
              />
            </FormGroup>
            <FormGroup>
              <Label for="holder">Account Holder</Label>
              <Input
                type="text"
                name="holder"
                value={this.state.activeItem.holder}
                onChange={this.handleChange}
                placeholder="Account holder name"
              />
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