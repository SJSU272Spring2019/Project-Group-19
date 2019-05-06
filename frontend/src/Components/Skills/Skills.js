import React, { Component } from "react";
import Axios from "axios";
import { Slider, Row, Col } from "antd";
import _ from "lodash";
import "./Skills.css"
var getEmail = require("../Localstorage").getEmail;

class Courses extends Component {
  state = {
    inputValue: 1,
    presentLength: 1,
    neededLength: 1,
    details: {}
  };

  componentDidMount = () => {
    console.log("this is email ", getEmail());
    let data = {
      email: getEmail()
    };
    Axios.post(window.base_url + "/getskills", data).then(response => {
      console.log("this is the final ", response.data);
      this.setState({ details: response.data });
      this.setState({
        presentLength: response.data.presentSkills.length,
        neededLength: response.data.neededSkills.length
      });
    });
  };

  renderNeededSkills = () => {
    console.log("inside the render ", this.state.details.neededSkills);
    let skillsNeeded = this.state.details.neededSkills;
    return _.map(skillsNeeded, (snew, i) => (
      <div>
        <li class="list-group-item">{snew}</li>
      </div>
    ));
  };

  renderPresentSkills = () => {
    console.log("inside the render ", this.state.details.presentSkills);
    let skills = this.state.details.presentSkills;
    return _.map(skills, (skill, i) => (
      <div>
        <li  style={{transitionDelay:'4s'}} class="list-group-item">{skill}</li>
      </div>
    ));
  };

  onChange = value => {
    this.setState({
      inputValue: value
    });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div>
        <div className="row-lg-2">
          <h4>Profile Strength</h4>
          
          <Slider
            id="slidercss"
            defaultValue={this.state.presentLength}
            min={1}
            max={this.state.neededLength}
            // onChange={this.onChange}
            // value={typeof inputValue === "number" ? inputValue : 0}
            value={this.state.presentLength}
          />
        </div>
        <div className="row">
          <div className="col-lg-6">
            <h4>Skills you have</h4>
            {this.renderPresentSkills()}
          </div>
          <div className="col-lg-6">
            <h4>Skills you need</h4>
            {this.renderNeededSkills()}
          </div>
        </div>
      </div>
    );
  }
}

export default Courses;
