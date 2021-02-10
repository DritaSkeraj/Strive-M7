import React, { useState, useEffect } from "react";
import '../styles/Messages.css'
import {Row, Col} from 'react-bootstrap'

import io from "socket.io-client";

const connOpt = {
  transports: ["websocket"],
};

let socket = io("https://striveschool-api.herokuapp.com", connOpt);

function Messages() {

  const [username, setUsername] = useState({_id: '60228aff6bbe8f00150e50d0'});
  const [otherUser, setOtherUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  
  let fetchUser = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/me",
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_BE_URL}`,
          },
        }
      );
      let parsedResponse = await response.json();
      console.log('my usename............', parsedResponse)
      setUsername(parsedResponse);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //socket.on("bmsg", (msg) => setMessages((messages) => messages.concat(msg)));

    socket.on("list", (users) => {
        console.log(users);
        setAllUsers(users)
    })
    socket.on("connect", () => console.log('connected to socket ✅'));
    /*socket.emit("setUsername", {
        username:  "test2"}
    )*/
  }, []);

  return (
    <>
      <div style={{ marginTop: "4rem" }}>
        <div className='messages-wrapper'>
            <Row>
                <Col xs={4} style={{'borderRight': '1px solid gray'}}>
                    <p>people to chat to</p>
                </Col>
                <Col xs={8}>
                    <p>actual chat</p>
                </Col>
            </Row>
        </div>
      </div>
    </>
  );
}

export default Messages;
