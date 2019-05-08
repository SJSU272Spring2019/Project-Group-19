import React, { Component } from "react";
import Graph from "../Graph/Graphs";

class Trending extends Component {
  state = {};
  render() {
    return (
      <div className="row">
        <div className="col-lg-8">
          <Graph style={{ height: "500px" }} />
        </div>
        <div className="col-lg-4">Hello</div>
      </div>
    );
  }
}

export default Trending;
