import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import Userfront from "@userfront/react";
import Userfront from "@userfront/core";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Dialog,
} from "@mui/material";
import { Table } from "reactstrap";
import NavBar from "./NavBar";
import View from "./View";
import view from "../images/view.png";
import check from "../images/check.png";
import trash from "../images/trash.png";
import warning from "../images/warning.png";

export default function Unpublish() {
  const [pending, setPending] = useState([]);
  const [display, setDisplay] = useState();
  const [viewClicked, setViewClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [publishClicked, setPublishedClicked] = useState(false);
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientLocation, setRecipientLocation] = useState("");
  const [comments, setComments] = useState("");
  const [recipientState, setRecipientState] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [deleteItem, setDeleteItem] = useState("");
  const [error, setError] = useState(false);
  const [isFunded, setIsFunded] = useState(false);
  const [published, setPublished] = useState(true);
  const [publishItem, setPublishItem] = useState("");

  //fetching iniital data on page load
  async function getUnpublished() {
    if (Userfront.tokens.accessToken){
    try {
      let response = await fetch("https://hyh-admin-server.herokuapp.com/unpublish", {
        headers: {
          'Authorization': `Bearer ${Userfront.tokens.accessToken}`
        }
      });
      response = await response.json();
      setPending(response);
    } catch (error) {
      console.log(error, "404 - Not Found");
      setError(true);
    }
  }
  }

  useEffect(() => {
    getUnpublished();
  }, []);
  //-------------------------------------

  //view modal open/close functionality
  function handleViewClick(e) {
    setDisplay(e.target.id); //setting ID of request clicked to display state
    if (viewClicked === false) {
      setViewClicked(true); //opening modal
    } else if (viewClicked === true) {
      setViewClicked(false); //closed modal
    }
  }

  //Publishing functionality----->
  //setting states of current item selected and opening confirmation popup once 'publish' button clicked
  const handlePublishOpen = (e) => {
    setPublishedClicked(true);
    setIsFunded(false);
    setPublished(true);
    setPublishItem(e.target.id);
    let selected = pending.find((item) => item._id === e.target.id);
    setItem(selected.itemName);
    setPrice(selected.price);
    setDescription(selected.donationDescription);
    setRecipientName(selected.recipientName);
    setRecipientLocation(selected.recipientLocation);
    setComments(selected.comments);
    setRecipientState(selected.recipientState);
    setItemCategory(selected.itemCategory);
  };

  //setting states back to empty strings if publish-function canceled
  const handlePublishClosed = () => {
    setPublishedClicked(false);
    setIsFunded(false);
    published(true);
    setItem("");
    setPrice("");
    setDescription("");
    setRecipientName("");
    setRecipientLocation("");
    setComments("");
    setRecipientState("");
    setItemCategory("");
  };

  //sending request info to server to be updated
  async function handlePublish(e) {
    if (Userfront.tokens.accessToken){
    try {
      let response = await fetch(`https://hyh-admin-server.herokuapp.com/publish`, {
        method: "POST",
        body: JSON.stringify({
          itemId: e.target.id,
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
          published: published,
        }),
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${Userfront.tokens.accessToken}`
        },
      });
      await response.json();
      window.location.reload();
    } catch (error) {
      console.log(error, "404 - Not Found");
    }
  }
  }
  //-------END PUBLISH FUNCTIONALITY--------------

  //Delete functionality---------------->
  //opening delete confirmation pop-up
  const handleClickOpen = (e) => {
    setDeleteClicked(true);
    setDeleteItem(e.target.id); //setting deleteItem to clicked item's Id
    let selected = pending.find((item) => item._id === e.target.id); //finding data that matches id of request clicked
    setItem(selected.itemName);
  };

  //closing delete confirmation pop-up
  const handleClose = () => {
    setDeleteClicked(false);
  };

  //sending to-be-deleted item's ID to database
  async function handleDelete(e) {
    if (Userfront.tokens.accessToken){
    try {
      let response = await fetch(`https://hyh-admin-server.herokuapp.com/delete`, {
        method: "POST",
        body: JSON.stringify({
          itemId: e.target.id, //button id (which is id of item clicked)
        }),
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${Userfront.tokens.accessToken}`
        },
      });
      await response.json();
      window.location.reload();
    } catch (error) {
      console.log(error, "404 - Not Found");
    }
  }
  }

  //creating table row of each unpublished item
  let unpublishedList = pending.map((itemCard, index) => {
    let id = itemCard._id;
    id = id.slice(17);
    let date = itemCard.dateCreated;
    date = date.slice(0, 10);
    return (
      <tr key={`donationItemCard-${index}`}>
        <td>{date}</td>
        <td>{itemCard.itemName}</td>
        <td>{itemCard.recipientName}</td>
        <td>{id}</td>
        <td>
          {/* creating view button for each item(request) card */}
          <button
            id={itemCard._id}
            className="dataBtn"
            type="button"
            onClick={handleViewClick}
          >
            <img
              src={view}
              width="15px"
              id={itemCard._id}
              onClick={handleViewClick}
            />
          </button>
        </td>
        {/* Publish Button (not shown if view or edit modal open) */}
        {viewClicked ? null : (
          <td>
            <Button id={itemCard._id} onClick={handlePublishOpen}>
              <img src={check} width="15px" id={itemCard._id} />
            </Button>
          </td>
        )}
        {/* Delete Button (not shown if view or edit modal open) */}
        {viewClicked ? null : (
          <td>
            <Button id={itemCard._id} onClick={handleClickOpen}>
              <img src={trash} width="15px" id={itemCard._id} />
            </Button>
          </td>
        )}
      </tr>
    );
  });

  //only allowing access to this component if user logged in - otherwise redirects to login page
  let location = useLocation();
  if (!Userfront.tokens.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return (
    <main>
      <NavBar />
      <div id="tableContainer">
        {/* View the selected item */}
        <View
          viewClicked={viewClicked}
          handleViewClick={handleViewClick}
          pending={pending}
          display={display}
        />
        <h1 id="unpublishedHeader">Unpublished Requests</h1>
        <Table hover size="sm">
          <thead>
            <tr>
              <th>Date Published</th>
              <th>Item</th>
              <th>Recipient</th>
              <th>ID</th>
              <th>View</th>
              <th>Publish</th>
              <th>Delete</th>
            </tr>
          </thead>
          {/* If error fetching data */}
          {error && (
            <div id="errorMsg">
              <h1>Error</h1>
              <h5>
                Unable to connect to database. Please try refreshing the page
              </h5>
            </div>
          )}
          <tbody>{unpublishedList}</tbody>
        </Table>
        <Dialog
          open={publishClicked}
          onClose={handlePublishClosed}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Publish {item}?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This request will be moved to 'pending requests' and will be
              public. Do you wish to continue?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePublishClosed}>Cancel</Button>
            {/* setting button's id to the item clicked id. button's id passed into fetch request*/}
            <Button id={publishItem} onClick={handlePublish} autoFocus>
              Publish
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={deleteClicked}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Delete {item}? <img src={warning} width="30px" />
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This request will be permanently deleted. Do you wish to continue?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {/* setting button's id to the item clicked id. button's id passed into fetch request*/}
            <Button id={deleteItem} onClick={handleDelete} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </main>
  );
}
