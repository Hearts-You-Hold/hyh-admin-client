import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import Userfront from "@userfront/core";
import toast, { Toaster } from "react-hot-toast";
import close from "../images/close.png";

export default function Edit(props) {
  //setting states with state props passed from funded component
  let itemId = props.display;
  const [item, setItem] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [recipientName, setRecipientName] = useState();
  const [recipientLocation, setRecipientLocation] = useState();
  const [comments, setComments] = useState();
  const [recipientState, setRecipientState] = useState();
  const [itemCategory, setItemCategory] = useState();
  const [isFunded, setIsFunded] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  //---------------------------------------------------------------------------

  //handling functionality of funded to pending check box
  function handleCheck() {
    if (isFunded === true) {
      setIsFunded(false);
    } else if (isFunded === false) {
      setIsFunded(true);
    }
  }

  //on form submit - sending form info to server to be updated
  async function handleSubmit(e) {
    e.preventDefault();
    setFormSubmitted(true);
    try {
      //displaying successful notification
      toast.success("Edit Saved Successfully");
      let response = await fetch(`https://hyh-admin-server.herokuapp.com/edit`, {
        method: "POST",
        body: JSON.stringify({
          itemId: itemId,
          itemName: item,
          itemPrice: price,
          donationDescription: description,
          isFunded: isFunded,
          recipientName: recipientName,
          recipientUSLocation: recipientLocation,
          dateCreated: new Date(),
          comments: comments,
          recipientState: recipientState,
          itemCategory: itemCategory,
        }),
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${Userfront.tokens.accessToken}`
        },
      });
      await response.json();
    } catch (error) {
      console.log(error, "404 - Not Found");
    }
  }

  //force reloading page after 1 second if form submitted successfully
  if (formSubmitted === true) {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  //Setting states once edit button clicked
  useEffect(() => {
    setItem(props.item);
    setPrice(props.price);
    setDescription(props.donationDescription);
    setRecipientName(props.recipientName);
    setRecipientLocation(props.recipientLocation);
    setComments(props.comments);
    setRecipientState(props.recipientState);
    setItemCategory(props.itemCategory);
  }, [props.editClicked]);

  //once edit button clicked (true), show form with prefilled input fields with clicked request's info
  if (props.editClicked === true) {
    let showSelectedRequest = (
      <Form className="requestForm" autoComplete="off" onSubmit={handleSubmit}>
        <Toaster />
        <div className="closeBtnContainer">
          <button id="modalCloseBtn" onClick={props.handleEditClick}>
            <img src={close} width="25px" />
          </button>
        </div>
        <h2 id="formTitle" style={{ textAlign: "center" }}>
          Edit Request
        </h2>
        {/* Marking all input fields as read-only except 'Comments' text area */}
        <FormGroup check>
          <div className="checkboxContainer">
            <Label check>
              <Input type="checkbox" onChange={handleCheck} /> Pending
            </Label>
          </div>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="itemName">Item Name</Label>
          <Input name="itemName" readOnly value={item} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="itemPrice">Item Price</Label>
          <Input name="itemPrice" readOnly value={price} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Input name="description" readOnly value={description} />
        </FormGroup>
        <div className="selectInputs">
          <FormGroup>
            <Label htmlFor="stateSelect">State</Label>
            <Input
              name="select"
              id="stateSelect"
              readOnly
              value={recipientState}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="categorySelect">Category</Label>
            <Input
              name="select"
              id="exampleSelect"
              readOnly
              value={itemCategory}
            ></Input>
          </FormGroup>
        </div>
        <FormGroup>
          <Label htmlFor="recipientName">Recipient Name</Label>
          <Input name="recipientName" readOnly value={recipientName} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="currentLocation">Recipient's Location</Label>
          <Input name="currentLocation" readOnly value={recipientLocation} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="comments">Comments</Label>
          <Input
            name="description"
            className="textArea"
            type="textarea"
            onChange={(e) => {
              setComments(e.target.value);
            }}
            value={comments}
          />
        </FormGroup>
        <div className="btnHolder">
          <button id="formBtn" type="submit">
            Update
          </button>
        </div>
      </Form>
    );
    return (
      <main id="modal-background" style={{ overflow: "scroll" }}>
        <section style={{ marginTop: "10px" }}>{showSelectedRequest}</section>
      </main>
    );
  }
  //not showing edit modal if edit button not clicked (false)
  return null;
}
