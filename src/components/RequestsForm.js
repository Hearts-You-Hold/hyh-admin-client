import React, { useState } from "react";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Navigate, useLocation } from "react-router-dom";
// import Userfront from "@userfront/react";
import Userfront from "@userfront/core";
import toast, { Toaster } from "react-hot-toast";
import NavBar from "./NavBar";
import "../stylesheets/main.css";

export default function RequestsForm() {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientLocation, setRecipientLocation] = useState("");
  const [comments, setComments] = useState("");
  const [recipientState, setRecipientState] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  //on form submit - sending form data to server
  async function handleSubmit(e) {
    e.preventDefault();
    setFormSubmitted(true);
    if (Userfront.tokens.accessToken){
    try {
      //displaying successful notification
      toast.success("Saved Successfully");
      let response = await fetch(`https://hyh-admin-server.herokuapp.com/`, {
        method: "POST",
        body: JSON.stringify({
          itemName: item,
          itemPrice: price,
          donationDescription: description,
          isFunded: false,
          recipientName: recipientName,
          recipientUSLocation: recipientLocation,
          dateCreated: new Date(),
          comments: comments,
          recipientState: recipientState,
          itemCategory: itemCategory,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      await response.json();
    } catch (error) {
      console.log(error, "404 - Not Found");
    }
  }
  }

  //force reloading page after 1 second if form submitted successfully
  if (formSubmitted === true) {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  //only allowing access to this component if user logged in - otherwise redirects to login page
  let location = useLocation();
  if (!Userfront.tokens.accessToken) {
    // Redirect to the /login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <main>
      <Toaster />
      <NavBar />
      {/* Form for inputting new requests */}
      <Form className="requestForm" autoComplete="off" onSubmit={handleSubmit}>
        <h2 id="formTitle" style={{ textAlign: "center" }}>
          Request Input Form
        </h2>
        <FormGroup>
          <Label htmlFor="itemName">Item Name</Label>
          <Input
            required={true}
            name="itemName"
            type="text"
            placeholder="Item name.."
            onChange={(e) => {
              setItem(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="itemPrice">Item Price</Label>
          <Input
            required={true}
            name="itemPrice"
            type="number"
            placeholder="$"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Input
            required={true}
            name="description"
            className="textArea"
            type="textarea"
            placeholder="description.."
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </FormGroup>
        <div className="selectInputs">
          <FormGroup>
            <Label htmlFor="stateSelect">State</Label>
            <Input
              required={true}
              type="select"
              name="select"
              id="stateSelect"
              onChange={(e) => {
                setRecipientState(e.target.value);
              }}
            >
              <option>- State -</option>
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
              required={true}
              type="select"
              name="select"
              id="exampleSelect"
              onChange={(e) => {
                setItemCategory(e.target.value);
              }}
            >
              <option>- Category -</option>
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
            required={true}
            name="recipientName"
            type="text"
            placeholder="recipient's name.."
            onChange={(e) => setRecipientName(e.target.value)}
          />
          <div className="FormText">
            <FormText>
              Type 'Anonymous' if recipient does not want to share their name
            </FormText>
          </div>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="currentLocation">Recipient's Location</Label>
          <Input
            required={true}
            name="currentLocation"
            type="text"
            placeholder="current location - origin location"
            onChange={(e) => {
              setRecipientLocation(e.target.value);
            }}
          />
          <div className="FormText">
            <FormText>
              Type 'Anonymous' if recipient does not want to share their
              location
            </FormText>
          </div>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="comments">Comments</Label>
          <Input
            name="description"
            className="textArea"
            type="textarea"
            placeholder="additional comments.."
            onChange={(e) => {
              setComments(e.target.value);
            }}
          />
        </FormGroup>
        <div className="btnHolder">
          <button id="formBtn" type="submit">
            Save & Publish
          </button>
        </div>
      </Form>
    </main>
  );
}
