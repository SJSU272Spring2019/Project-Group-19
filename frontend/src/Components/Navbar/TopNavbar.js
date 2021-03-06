import React, { Component } from "react";
import { Menu, Icon } from "antd";
import "./TopNavbar.css";
var getRole = require("../Localstorage").getRole;

class TopNavbar extends Component {
  state = {};
  render() {
    return (
      <div className="navbarclass">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          theme="dark"
        >
          <Menu.Item key="title" id="title">
            <h5 style={{ color: "white" }}>For you to become {getRole() || ""} </h5>
          </Menu.Item>

          <Menu.Item key="login" id="login">
            <Icon type="google" />
            Google Login
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default TopNavbar;
