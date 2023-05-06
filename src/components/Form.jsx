import { Room, Access, Building } from "../datastructures";
import { Button, Form, Modal, InputGroup, Alert } from "react-bootstrap";
import React, { useState } from "react";

export default function DataEntry( {buildingList, setBuildingList}) {
  const [show, setShow] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [building, setBuilding] = useState("default");
  const [showAlert, setShowAlert] = useState(false)
  const handleClose = () => {
    setShow(false);
    setShowNew(false);
  };
  const handleShow = () => setShow(true);

  const handleCustom = (e) => {
    setBuilding(e.target.value);
    if (e.target.value === "new")
        setShowNew(true) 
    else {
        setShowNew(false); setShowAlert(false); } }
  

  const updateBuilding = (e) => {
    setBuilding(e.target.value);
  }
  const addBuilding = (e) => {
    if (!buildingList.includes(building)) {
        setBuildingList([...buildingList, building]);
        setShowAlert(false);
    }
    else {
        setShowAlert(true);
    }
    e.target.value === "new" ? setShowNew(true) : setShowNew(false);
  };

  return (
    <>
      {console.log(setBuildingList)}
      <Button variant="primary" onClick={handleShow}>
        Add Building Information
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="buildingSelect">
              <Form.Label>Building</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={handleCustom}
              >
                <option value="default">Select Building</option>
                {console.log(buildingList)}
                {buildingList.map((building) => (
                  <option value={building}>{building}</option>
                ))}
                <option value="new">Add New Building</option>
              </Form.Select>
            </Form.Group>

            {showNew && 
              <InputGroup className="mb-3">
              <Form.Control
                placeholder="Enter new building name"
                aria-label="Building name entry"
                onChange={updateBuilding}
              />
              <Button variant="outline-secondary" id="button-addon1" onClick={addBuilding}>
                Submit
              </Button>
            </InputGroup>
            }
            {showAlert && <Alert key="invalidCustom" variant="danger">
                Invalid Building Name: Already in Database
        </Alert>}

            

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

