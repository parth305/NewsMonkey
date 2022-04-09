import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      mode: "light",
      color: "#8ABFEA"
    }
  }
  changecolor = (event) => {
    if (this.state.mode === "light") {
      return
    }
    this.setState({
      mode: this.state.mode,
      color: event.target.value
    })
    document.body.style.backgroundColor = this.state.color
  }
  togglemode = () => {
    console.log("hey");
    if (this.state.mode === "light") {
      this.setState({
        mode: "dark",
        color: this.state.color
      })
      document.body.style.backgroundColor = this.state.color
    }
    else {
      this.setState({
        mode: "light",
        color: this.state.color
      })
      document.body.style.backgroundColor = "white"
    }
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar mode={this.state.mode} color={this.state.color} togglemode={this.togglemode} changecolor={this.changecolor} />
          <Routes>
            <Route exact path="/" element={ <News key="/" mode={this.state.mode} pagesize={5} country="in" category="general" />}></Route>
            <Route exact path="/sports" element={ <News key="sports"  mode={this.state.mode} pagesize={5} country="in" category="sports" />}></Route>
            <Route exact path="/technology" element={ <News key="technology"  mode={this.state.mode} pagesize={5} country="in" category="technology" />}></Route>
            <Route exact path="/science" element={ <News key="science"  mode={this.state.mode} pagesize={5} country="in" category="science" />}></Route>
            <Route exact path="/health" element={ <News key="health"  mode={this.state.mode} pagesize={5} country="in" category="health" />}></Route>
            {/* <Route exact path="/general" element={ <News key="general" mode={this.state.mode} pagesize={5} country="in" category={"general"} />}></Route> */}
            <Route exact path="/entertainment" element={ <News key="entertainment"  mode={this.state.mode} pagesize={5} country="in" category="entertainment" />}></Route>
            <Route exact path="/business" element={ <News key="business" mode={this.state.mode} pagesize={5} country="in" category="business" />}></Route>
          </Routes>
        </BrowserRouter>

      </div>
    )
  }
}
