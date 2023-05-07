import { Accordion, Button, Alert, Form, InputGroup } from "react-bootstrap";
import { React, useState } from "react";

export default function BuildingEditor({ allInfo, setAllInfo, building }) {
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showRoomAlert, setShowRoomALert] =useState(false);
  const [roomNum, setRoomNum] = useState("0");
  if (!Object.keys(allInfo).includes(building)) {
    return <div></div>;
  }
  const readOnlyInfo = allInfo[building];
  const addNewRoom = (e) => {
    let newRoom = {
      number: roomNum,
      building: [building],
      floor: "",
      type: "",
      size: "small",
    };
    if (!Object.keys(allInfo[building].rooms).includes(roomNum) ) {
    setAllInfo({
      ...allInfo,
      [building]: {
        ...allInfo[building],
        rooms: { ...allInfo[building].rooms, [roomNum]: newRoom },
      }
    });
    setShowRoomALert(false);
  }
    else{
      setShowRoomALert(true);
    }
  }
  const updateNewRoom = (e) => setRoomNum(e.target.value);

  return (
    <div>
      <h1>{building}</h1>
      <h3>Accessibility</h3>
      {Object.keys(readOnlyInfo.access).map((attribute) => (
        <p>
          {attribute}: {readOnlyInfo.access.attribute}
        </p>
      ))}
      <h2>Rooms</h2>
      <Accordion>
        {Object.keys(readOnlyInfo.rooms).map((room) => (
          <Accordion.Item eventKey={room}>
            <Accordion.Header>Room {room}</Accordion.Header>
            <Accordion.Body>
              {Object.keys(readOnlyInfo.rooms[room]).map((attribute) => (
                <p>
                  {attribute}: {readOnlyInfo.rooms[room][attribute]}
                  hi god its me megan i think i might be actually lliterally dying rn
                </p>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      {Object.keys(readOnlyInfo.rooms).length === 0 && (
        <div>No Room Information Available</div>
      )}
      <Button onClick={() => setShowAddRoom(true)}>Add New Room</Button>
      {showAddRoom && 
        <InputGroup className="mb-3">
        <Form.Control
          placeholder="Enter new room number"
          aria-label="Add a room"
          onChange={updateNewRoom}
        />
        <Button variant="outline-secondary" id="button-addon1" onClick={addNewRoom}>
          Submit
        </Button>
      </InputGroup>
      }
      {showRoomAlert && <Alert key="invalidCustom" variant="danger">
          Invalid Building Name: Already in Database
  </Alert>}
      
    </div>
  );
}
