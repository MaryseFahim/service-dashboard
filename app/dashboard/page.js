"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, PopoverBody, UncontrolledPopover } from "reactstrap";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Dropdown } from "react-bootstrap";

export default function Dashboard() {
  const router = useRouter();
  const [isOperational, setIsOperational] = useState(true);
  const servers = [
    {
      name: "OpenAi",
      ipaddress: "156.23",
      responsetime: "30mns",
      uptime: "today",
      status: "Operational",
    },
    {
      name: "Chatgpt",
      ipaddress: "156.82",
      responsetime: "2h",
      uptime: "now",
      status: "Operational",
    },
    {
      name: "Google",
      ipaddress: "156.82",
      responsetime: "2h",
      uptime: "now",
      status: "Operational",
    },
  ];
  const [sortedServers, setSortedServers] = useState(servers); // Initial state

  const handleSortChange = (criteria, order) => {
    const sortedList = [...sortedServers].sort((a, b) => {
      if (criteria === "name") {
        const comparison = a.name.localeCompare(b.name);
        return order === "asc" ? comparison : -comparison;
      }
    });
    setSortedServers(sortedList);
  };
  const currentDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const originalObject = [
    { day: currentDate, color: "green", status: "Uptime" },
  ];
  // Function to add days to a date string
  function addDays(dateString, days) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  // Create an empty array to store the new objects
  const extendedArray = [];

  // Loop 90 times to create new objects with incremented dates
  for (let i = 0; i < 90; i++) {
    const newDate = addDays(originalObject[0].day, i - 89);
    var color = i % 10 == 0 ? "orange" : "green";
    var newStatus = i % 10 == 0 ? "Degraded" : "Uptime";
    if (i == 0) {
      color = "red";
      newStatus = "Downtime";
    }
    extendedArray.push({ day: newDate, status: newStatus, color: color });
  }

  // Loop to make sure all systems are currently operational
  for (let i = 0; i < servers.length; i++) {
    var status = servers[i].status;
    if (status != "Operational") {
      setIsOperational(false);
      localStorage.setItem("isOperational", true);
    }
  }

  return (
    <div className="" id="scrollable-content">
      <div className="container-fluid">
        <div className="container px-5">
          <div
            className="col-12 text-center py-5 text-light d-flex justify-content-between
             align-items-center"
            style={{ padding: "0 150px 0 150px" }}
          >
            <div className="mainTitle d-flex align-items-baseline">
              <h1 style={{ fontSize: "66px" }}>XO</h1>
              <h1 style={{ fontSize: "30px" }}>rithm</h1>
            </div>
            <div>
              <Button color="light">About Us</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container p-5">
        <h1 className="text-center">Dashboard</h1>
        {isOperational ? (
          <p
            className="d-flex justify-content-center
          align-items-center"
          >
            Current Status: Operational<span className="checkMark"> ✓ </span>
          </p>
        ) : (
          <p
            className="d-flex justify-content-center
          align-items-center"
          >
            Current Status: Down
          </p>
        )}
        <div
          className="d-flex justify-content-end"
          style={{ padding: "0 150px 0 150px" }}
        >
          <Dropdown>
            <Dropdown.Toggle variant="light">Sort by Name</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSortChange("name", "asc")}>
                Ascending
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange("name", "desc")}>
                Descending
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {sortedServers.map((server, index) => (
          <div key={index} className="row my-3 p-2 px-4">
            <div
              className="serverTitle d-flex justify-content-between align-items-end"
              style={{ padding: "0 150px 0 150px" }}
            >
              <h3 className="mt-2">
                {server.name}
                <Button
                  className=" mb-1"
                  color="default"
                  id={server.name}
                  type="button"
                >
                  ?
                </Button>
                <UncontrolledPopover placement="right" target={server.name}>
                  <PopoverBody>
                    IP Address: {server.ipaddress} <br /> Response Time:{" "}
                    {server.responsetime} <br /> Uptime: {server.uptime}
                  </PopoverBody>
                </UncontrolledPopover>
              </h3>
              <h5 className="text-success">{server.status}</h5>
            </div>
            <svg
              width="100"
              height="100"
              rx="5"
              viewBox="400 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              {extendedArray.map((day, index) => (
                <Popup
                  trigger={
                    <rect
                      key={index}
                      className="rectangle"
                      width="6"
                      height="30"
                      x={index * 10}
                      y="25"
                      rx="0"
                      ry="1"
                      fill={day.color}
                    />
                  }
                  position="top"
                >
                  <div>{day.day} </div>
                  <div>{day.status} </div>
                </Popup>
              ))}
              <text x="860" y="80" className="small">
                Today
              </text>
            </svg>
          </div>
        ))}

        <div
          className="d-flex justify-content-end "
          style={{ padding: "0 150px" }}
        >
          <Button
            type="button"
            className="btn btn-outline-danger"
            color="white"
            onClick={() => {
              router.push("/");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
