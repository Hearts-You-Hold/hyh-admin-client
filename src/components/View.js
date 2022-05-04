import React from "react";
import { Table } from "reactstrap";
import close from "../images/close.png";

export default function Modal(props) {
  //when modal is open (true):
  if (props.viewClicked === true) {
    let newCardList = props.pending;
    //finding data (request) that matches ID (display) of selected request
    let selectedRequest = newCardList.find(
      (item) => item._id === props.display
    );
    //creating item Id from mongo object Id
    let id = selectedRequest._id;
    id = id.slice(17);
    let date = selectedRequest.dateCreated;
    date = date.slice(0, 10);
    let viewSelectedRequest = (
      <section>
        <div className="closeBtnContainer">
          <button id="modalCloseBtn" onClick={props.handleViewClick}>
            <img src={close} width="25px" />
          </button>
        </div>
        <h4
          style={{
            textAlign: "center",
            marginBottom: "20px",
            textDecoration: "underline",
            textDecorationColor: "gray",
          }}
        >
          Viewing {selectedRequest.itemName} for {selectedRequest.recipientName}
        </h4>
        <Table striped bordered size="lg">
          <tbody>
            <tr>
              <th className={"w-25"} scope="row">
                Id
              </th>
              <td>{id}</td>
            </tr>
            <tr>
              <th scrope="row">Date</th>
              <td>{date}</td>
            </tr>
            <tr>
              <th scope="row">Item</th>
              <td>{selectedRequest.itemName}</td>
            </tr>
            <tr>
              <th scope="row">Price</th>
              <td>${selectedRequest.itemPrice}</td>
            </tr>
            <tr>
              <th scope="row">Description</th>
              <td>{selectedRequest.donationDescription}</td>
            </tr>
            <tr>
              <th scope="row">State</th>
              <td>{selectedRequest.recipientState}</td>
            </tr>
            <tr>
              <th scope="row">Category</th>
              <td>{selectedRequest.itemCategory}</td>
            </tr>
            <tr>
              <th scope="row">Recipient</th>
              <td>{selectedRequest.recipientName}</td>
            </tr>
            <tr>
              <th scope="row">Location</th>
              <td>{selectedRequest.recipientUSLocation}</td>
            </tr>
            <tr>
              <th scope="row">Comments</th>
              <td>{selectedRequest.comments}</td>
            </tr>
          </tbody>
        </Table>
      </section>
    );
    return (
      <main id="modal-background">
        <section id="modal-content">
          <div id="viewTable">{viewSelectedRequest}</div>
        </section>
      </main>
    );
  }
  //showing nothing if view button not clicked (false)
  return null;
}
