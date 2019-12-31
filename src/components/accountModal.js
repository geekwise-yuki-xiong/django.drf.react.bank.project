// frontend/src/components/Modal.js
//////////////////////////////////////////////
// Still needs to update
//////////////////////////////////////////////
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
      activeItem: this.props.activeItem
    };
  }
  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };
  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Branch Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="bank_name">Bank Name</Label>
              <Input
                type="text"
                name="bank_name"
                value={this.state.activeItem.bank_name}
                onChange={this.handleChange}
                placeholder="Enter the bank's name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="location">Location</Label>
              <Input
                type="text"
                name="location"
                value={this.state.activeItem.location}
                onChange={this.handleChange}
                placeholder="Enter the bank's location"
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