import React, { Component } from "react";
import Axios from "axios";
import { Carousel, Select, InputNumber, TreeSelect, Icon, Tooltip } from "antd";
import { Input } from "antd";
import _ from "lodash";
import "./Home.css";
var setEmail = require("../Localstorage").setEmail;
var setRole = require("../Localstorage").setRole;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {}
    };
    this.onChangeGoal = this.onChangeGoal.bind(this);
    this.onChangeSkills = this.onChangeSkills.bind(this);
    this.onChangeCert = this.onChangeCert.bind(this);
    this.onChangeExp = this.onChangeExp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await Axios.get(window.base_url + "/getalldata").then(response => {
      this.setState({ details: response.data });
    });
  }

  /** Rendering each list **/
  rolesList() {
    let roleslist = this.state.details.roles;
    return _.map(roleslist, role => (
      <Option value={role.CareerPath}>{role.CareerPath}</Option>
    ));
  }

  skillList() {
    let skills = this.state.details.skills;
    return _.map(skills, (skill, item) => (
      <TreeNode value={skill.Skill} title={skill.Skill} key={item} />
    ));
  }

  certificateList() {
    let certifications = this.state.details.certification;
    return _.map(certifications, (certificate, item) => (
      <TreeNode
        value={certificate.Certification}
        title={certificate.Certification}
        key={item}
      />
    ));
  }

  onChangeGoal(value) {
    this.setState({ role: value });
  }

  onChangeSkills(value) {
    this.setState({ skills: value });
  }

  onChangeCert = value => {
    this.setState({ certification: value });
  };

  onChangeExp = value => {
    this.setState({ experience: value });
  };

  handleChangeEmail = e => {
    let email = e.target.value;
    if (email.match(/\w+@\w+([.-]?\w+)*\.(edu|com)/gi)) {
      console.log("entered right email", email);
      this.setState({ email: email });
    } else {
      console.log("wrong email");
      alert("Enter valid Email");
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    let userDetails = {
      email: this.state.email,
      Role: this.state.role,
      Experience: this.state.experience,
      Skills: this.state.skills,
      Certifications: this.state.certification
    };
    console.log("this is final data", userDetails);
    Axios.post(window.base_url + "/register", userDetails).then(response => {
      setEmail(response.data.email);
      setRole(response.data.role);
      this.props.history.push("/courses");
    });
  };

  render() {
    return (
      <div>
        <Carousel id="formselect">
          <div>
            <h5 className="labelitem">Career Path : </h5>
            <br />
            <Select
              showSearch
              name="goal"
              style={{ width: 300 }}
              dropdownStyle={{ maxHeight: 400, overflow: "scroll" }}
              placeholder="Desired Career Path"
              size="large"
              onChange={this.onChangeGoal}
              onSearch={this.onSearch}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.rolesList()}
            </Select>
          </div>

          <div>
            <h5 className="labelitem">Skills : </h5>
            <br />
            <TreeSelect
              showSearch
              style={{ width: 300 }}
              value={this.state.skills}
              dropdownStyle={{ maxHeight: 400, overflow: "scroll" }}
              placeholder="Skills"
              size="large"
              allowClear
              multiple
              treeDefaultExpandAll
              onChange={this.onChangeSkills}
            >
              {this.skillList()}
            </TreeSelect>
          </div>

          <div>
            <h5 className="labelitem">Your Certifications :</h5> <br />
            <TreeSelect
              showSearch
              style={{ width: 300 }}
              value={this.state.certification}
              dropdownStyle={{ maxHeight: 400, overflow: "scroll" }}
              placeholder="Certification"
              size="large"
              allowClear
              multiple
              treeDefaultExpandAll
              onChange={this.onChangeCert}
            >
              {this.certificateList()}
            </TreeSelect>
          </div>

          <div>
            <h5 className="labelitem">Your Experience (in Months): </h5>
            <br />
            <InputNumber
              size="large"
              min={0}
              max={100}
              defaultValue="12"
              onChange={this.onChangeExp}
            />
          </div>

          <div>
            <h5 className="labelitem">Email :</h5> <br />
            <div id="emaildiv">
              <Input
                id="emailinput"
                onPressEnter={this.handleChangeEmail}
                placeholder="Enter your username"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                suffix={
                  <Tooltip title="Extra information">
                    <Icon
                      type="info-circle"
                      style={{ color: "rgba(0,0,0,.45)" }}
                    />
                  </Tooltip>
                }
              />
            </div>
          </div>
        </Carousel>
        <button
          className="btn btn-dark"
          id="submitbutton"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default Home;
