// frontend/src/components/Modal.js
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
        <ModalHeader toggle={toggle}> Product Item </ModalHeader>
        <ModalBody>
        <Form>
          <FormGroup>
            <Label for="product_name">Product Name</Label>
                <Input
                    type="text"
                    name="product_name"
                    value={this.state.activeItem.product_name}
                    onChange={this.handleChange}
                    placeholder="Enter the product name"
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