import React, { PureComponent } from "react";
import MsgSide from "./MsgSide";
import MainMsg from "./MainMsg";
import io from "socket.io-client";
import { Row, Col } from "react-bootstrap";
import "../../styles/Messages.css";

class MsgPage extends PureComponent {
  socket = null;
  state = {
    message: "",
    users: [],
    selectedUser: null,
    user: null
  };

  fetchUser = async () => {
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
      console.log("me............", parsedResponse);
      this.setState({ user: parsedResponse });
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    const connOpt = {
      transports: ["websocket"],
    };

    const user = await this.fetchUser();
    if (user !== undefined) {
      //this.setState({ user: user });
    } 

    this.socket = io("https://striveschool-api.herokuapp.com/", connOpt);

    this.socket.on("connect", () => console.log("Connected", this.socket.id));

    this.socket.on("list", (users) => {
      console.log('users:::::::', users)
      this.setState({ users: [] });
      let userNoDuplicate = [...new Set(users)];
      this.setState({
        users: this.state.users
          .concat(userNoDuplicate)
          .filter((x) => x !== this.state.user.username),
      });
    });


    //this.socket.emit("setUsername", {
     // username: this.state.user.username,
     //username: {username: 'test'}
    //});
  }

  handleTxtOnChange = (e) => {
    this.setState({ message: e.target.value });
  };

  handleUserOnClick = (e) => {
    this.setState({ selectedUser: e.currentTarget.id });
    console.log(e.currentTarget.id);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.message !== "") {
      console.log(this.state.selectedUser);
      this.socket.emit("chatmessage", {
        to: this.state.selectedUser,
        text: this.state.message,
      });
      this.setState({ message: "" });
    }
  };

  componentDidUnmount() {
    this.socket.disconnect();
  }

  render() {
    return (
      <div
        id="msg-page"
        style={{ marginTop: "4rem" }}
        className="messages-wrapper"
      >
        <Row>
          <Col xs={4} style={{ borderRight: "1px solid gray" }}>
            <MsgSide
              users={this.state.users}
              handleUserOnClick={this.handleUserOnClick}
            />
          </Col>
          <Col xs={8}>
            <MainMsg
              selectedUser={this.state.selectedUser}
              handleTxtOnChange={this.handleTxtOnChange}
              value={this.state.message}
              handleSubmit={this.handleSubmit}
              user={this.state.user}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
export default MsgPage;
