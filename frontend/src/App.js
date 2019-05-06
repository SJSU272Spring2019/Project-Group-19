import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import Home from "./Components/Home/Home";
import Sidebarfile from "./Components/Sidebar/Sidebarfile";
import Navbar from "./Components/Navbar/TopNavbar";
import Certification from "./Components/Certification/Certification";
import Courses from "./Components/Courses/Courses";
import Events from "./Components/Events/Events";
import Skills from "./Components/Skills/Skills";
import "antd/dist/antd.css";
import "./App.css";
import Trending from "./Components/Trending/trending"
import linegraph from "./Components/Trending/line_graph"
import line_graph from "./Components/Trending/crazyline"
const { Header, Content, Sider } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="row-1">
            <Route path="/" component={Navbar} />
          </div>
          <div className="row-11">
            <div className="row">
              <div className="col-md-3" id="sidebarcss">
                <Sidebarfile />
              </div>

              <div className="col-md-9">
                <Layout id="layoutcontent">
                  <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/courses" component={Courses} />
                    <Route path="/events" component={Events} />
                    <Route path="/certification" component={Certification} />
                    <Route path="/Trending" component={Trending}/>
                    <Route path="/Line" component={linegraph}/> 
                    <Route path="/line_graph" component ={line_graph}/>
                    <Route path="/skills" component={Skills} />
                  </Switch>
                </Layout>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
