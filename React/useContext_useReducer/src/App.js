import React from "react";
import './App.css';

/**
 * 第二步，引入这个上下文状态组件，并包裹需要该状态的组件。
 * */
import {Color} from "./color"
import Buttons from "./conponents/Buttons";
import ShowArea from "./conponents/ShowArea";

function App() {
  return (
      <div className="App">
        <Color>
          <ShowArea/>
          <Buttons/>
        </Color>
      </div>
  );
}

export default App;
