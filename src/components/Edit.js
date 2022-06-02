import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import Userfront from "@userfront/core";
import toast, { Toaster } from "react-hot-toast";
import close from "../images/close.png";

export default function Edit(props) {
  let itemId = props.display;
  const [item, setItem] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [recipientName, setRecipientName] = useState();
  const [recipientLocation, setRecipientLocation] = useState();
  const [comments, setComments] = useState();
  const [recipientState, setRecipientState] = useState();
  const [itemCategory, setItemCategory] = useState();
  const [isFunded, setIsFunded] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  //handling functionality of pending to funded check box
  function handleCheck() {
    if (isFunded === false) {
      setIsFunded(true);
    } else if (isFunded === true) {
      setIsFunded(false);
    }
  }

  //on form submit - sending form info (states) to server to be updated
  async function handleEditSubmit(e) {
    e.preventDefault();
    setFormSubmitted(true);
    try {
      //displaying successful notification
      toast.success('Edit Saved Successfully')
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
      console.log(error, "404 - Not found");
    }
  }

  //force reloading page after 1 second if form submitted successfully
  if (formSubmitted === true) {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  //updating states to pre-fill form once edit button is clicked
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
      <Form className="requestForm" autoComplete="off" onSubmit={handleEditSubmit}>
        <Toaster />
        <div className="closeBtnContainer">
          <button id="modalCloseBtn" onClick={props.handleEditClick}>
            <img src={close} width="25px" />
          </button>
        </div>
        <h2 id="formTitle" style={{ textAlign: "center" }}>
          Edit Request
        </h2>
        <FormGroup check>
          <div className="checkboxContainer">
            <Label check>
              <Input type="checkbox" onChange={handleCheck} /> Funded
            </Label>
          </div>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="itemName">Item Name</Label>
          <Input
            name="itemName"
            type="text"
            onChange={(e) => {
              setItem(e.target.value);
            }}
            value={item}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="itemPrice">Item Price</Label>
          <Input
            name="itemPrice"
            type="number"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            value={price}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Input
            name="description"
            className="textArea"
            type="textarea"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
          />
        </FormGroup>
        <div className="selectInputs">
          <FormGroup>
            <Label htmlFor="stateSelect">State</Label>
            <Input
              type="select"
              name="select"
              id="stateSelect"
              onChange={(e) => {
                setRecipientState(e.target.value);
              }}
              value={recipientState}
            >
              <option>Alabama</option>
              <option>Alaska</option>
              <option>Arizona</option>
              <option>Arkansas</option>
              <option>California</option>
              <option>Colorado</option>
              <option>Connecticut</option>
              <option>Delaware</option>
              <option>Florida</option>
              <option>Georgia</option>
              <option>Hawaii</option>
              <option>Idaho</option>
              <option>Illinois</option>
              <option>Indiana</option>
              <option>Iowa</option>
              <option>Kansas</option>
              <option>Kentucky</option>
              <option>Louisiana</option>
              <option>Maine</option>
              <option>Maryland</option>
              <option>Massachusetts</option>
              <option>Michigan</option>
              <option>Minnesota</option>
              <option>Mississippi</option>
              <option>Missouri</option>
              <option>Montana</option>
              <option>Nebraska</option>
              <option>Nevada</option>
              <option>New Hampshire</option>
              <option>New Jersey</option>
              <option>New Mexico</option>
              <option>New York</option>
              <option>North Carolina</option>
              <option>North Dakota</option>
              <option>Ohio</option>
              <option>Oklahoma</option>
              <option>Oregon</option>
              <option>Pennsylvania</option>
              <option>Rhode Island</option>
              <option>South Carolina</option>
              <option>South Dakota</option>
              <option>Tennessee</option>
              <option>Texas</option>
              <option>Utah</option>
              <option>Vermont</option>
              <option>Virginia</option>
              <option>Washington</option>
              <option>West Virginia</option>
              <option>Wisconsin</option>
              <option>Wyoming</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="categorySelect">Category</Label>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              onChange={(e) => {
                setItemCategory(e.target.value);
              }}
              value={itemCategory}
            >
              <option>Bedroom & Bathroom</option>
              <option>Footwear</option>
              <option>Clothing</option>
              <option>Computers</option>
              <option>Gas Cards & Gift Cards</option>
              <option>Outerwear</option>
              <option>Kitchenware & Appliances</option>
              <option>Livingroom</option>
              <option>Toys & Children</option>
              <option>Misc</option>
            </Input>
          </FormGroup>
        </div>
        <FormGroup>
          <Label htmlFor="recipientName">Recipient Name</Label>
          <Input
            name="recipientName"
            type="text"
            onChange={(e) => setRecipientName(e.target.value)}
            value={recipientName}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="currentLocation">Recipient's Location</Label>
          <Input
            name="currentLocation"
            type="text"
            onChange={(e) => {
              setRecipientLocation(e.target.value);
            }}
            value={recipientLocation}
          />
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
    //------------------------------------------------------------------
    return (
      <main id="modal-background" style={{ overflow: "scroll" }}>
        <section>{showSelectedRequest}</section>
      </main>
    );
  }
  //not showing edit modal if edit button has not been clicked (false)
  return null;
}
