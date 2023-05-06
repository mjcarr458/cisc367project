import { Button, Form, Modal, InputGroup, Alert } from "react-bootstrap";
import React, { useState } from "react";
import BuildingEditor from "./BuildingEditor";

function newBuilding(buildingname) {
  return {
      rooms: {},
      name: buildingname,
      access: {
          elevators: false,
          entrances: "no data provided"
      },
      other: []
    }}

export default function DataEntry( {buildingInfo, setBuildingInfo}) {
  const [show, setShow] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [building, setBuilding] = useState("default");
  const [showAlert, setShowAlert] = useState(false);
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
    if (!Object.keys(buildingInfo).includes(building)) {
        setBuildingInfo({...buildingInfo, [building]:newBuilding(building)});
        setShowAlert(false);
    }
    else {
        setShowAlert(true);
    }
    e.target.value === "new" ? setShowNew(true) : setShowNew(false);
  };

  return (
    <>
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
                {Object.keys(buildingInfo).map((building) => (
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

            

            <BuildingEditor allInfo={buildingInfo} setAllInfo={setBuildingInfo} building={building}></BuildingEditor>
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

