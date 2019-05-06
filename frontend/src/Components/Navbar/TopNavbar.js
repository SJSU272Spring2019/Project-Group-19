import React, { Component } from "react";
import { Menu, Icon } from "antd";
import "./TopNavbar.css";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

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
