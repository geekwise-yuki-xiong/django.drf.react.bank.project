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
        <p style={{fontWeight: 600}}>Hold 'ctrl' OR 'cmd' to select multiple products</p>
        <Form>
            <FormGroup>
            <Label style={{position: 'relative', bottom: '71px', paddingRight: '13px'}} for="product_options">Type</Label>
            <select name="product_options" multiple>
            <option value="checking">CHECKING</option>
            <option value="savings">SAVINGS</option>
            <option value="debit-line">DEBIT-LINE</option>
            <option value="credit-line">CREDIT-LINE</option>
            <option value="loan">LOANS</option>
            </select>
            </FormGroup>
            <FormGroup>
            <Label style={{position: 'relative', paddingRight: '13px'}} for="product_owner">Bank</Label>
            <select name="product_owner">
                <option value="eecu">EECU</option>
                <option value="bank-of-america">Bank of America</option>
                <option value="golden-1">Golden 1</option>
                <option value="chase">Chase</option>
            </select>
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