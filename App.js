import './App.css';

import React, { useState } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { useState } from 'react/cjs/react.production.min';
// import { useState } from 'react/cjs/react.production.min';

export default function App() {

  let apikey = process.env.REACT_APP_NEWS_API2
  // let apikey = "2912b65428d6445cb363ecfc0291dd63"
  let [mode, setmode] = useState("light");
  let [color, setcolor] = useState("#8ABFEA")
  let changecolor = (event) => {
    if (mode === "light") {
      return
    }
    setcolor(
      event.target.value
    )
    document.body.style.backgroundColor = color
  }
  let togglemode = () => {
    console.log("hey");
    if (mode === "light") {
      setmode(
        "dark"
      )
      document.body.style.backgroundColor = color
    }
    else {
      setmode(
        "light"
      )
      document.body.style.backgroundColor = "white"
    }
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar mode={mode} color={color} togglemode={togglemode} changecolor={changecolor} />
        <Routes>
          <Route exact path="/" element={<News apikey={apikey} key="/" mode={mode} pagesize={6} country="in" category="general" />}></Route>
          <Route exact path="/sports" element={<News apikey={apikey} key="sports" mode={mode} pagesize={6} country="in" category="sports" />}></Route>
          <Route exact path="/technology" element={<News apikey={apikey} key="technology" mode={mode} pagesize={6} country="in" category="technology" />}></Route>
          <Route exact path="/science" element={<News apikey={apikey} key="science" mode={mode} pagesize={6} country="in" category="science" />}></Route>
          <Route exact path="/health" element={<News apikey={apikey} key="health" mode={mode} pagesize={6} country="in" category="health" />}></Route>
          {/* <Route exact path="/general" element={ <News key="general" mode={mode} pagesize={6} country="in" category={"general"} />}></Route> */}
          <Route exact path="/entertainment" element={<News apikey={apikey} key="entertainment" mode={mode} pagesize={6} country="in" category="entertainment" />}></Route>
          <Route exact path="/business" element={<News apikey={apikey} key="business" mode={mode} pagesize={6} country="in" category="business" />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}
