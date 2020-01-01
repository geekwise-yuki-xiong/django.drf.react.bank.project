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
        <ModalHeader toggle={toggle}> Account </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label style={{position: 'relative', bottom: '71px', paddingRight: '13px'}} for="bank_partner">Bank Partner</Label>
              <select name="bank_partner">
              <option value="EECU">EECU</option>
              <option value="Bank of America">Bank of America</option>
              <option value="Golden 1">Golden 1</option>
              <option value="Bank of the West">Bank of the West</option>
              <option value="Chase">Chase</option>
              </select>
            </FormGroup>
            <FormGroup>
              <Label style={{position: 'relative', bottom: '71px', paddingRight: '13px'}} for="holder">Account Holder</Label>
              <select name="holder">
              <option value="Hiroyuki">Hiroyuki</option>
              <option value="Korey">Korey</option>
              <option value="Stef">Stef</option>
              <option value="De">De</option>
              <option value="Fritz">Fritz</option>
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