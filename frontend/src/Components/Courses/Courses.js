import React, { Component, Row, Col } from "react";
import { Slider } from "antd";

class Courses extends Component {
  state = {
    inputValue: 1,
  }


  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  }

  render() {
    const { inputValue } = this.state;
    return (
      <div>
        Courses
        <Row>
        <Col span={12}>
        <Slider defaultValue={30} tooltipVisible />
          <Slider
            min={1}
            max={20}
            onChange={this.onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
          />
        </Col></Row>
        
      </div>
    );
  }
}

export default Courses;
