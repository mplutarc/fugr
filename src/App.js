
import './App.css';
import SmallBase from "./components/SmallBase";
import LargeBase from "./components/LargeBase";
import React from "react";

function App() {


  return (
    <div className="App">
	    <button>
		    Show small base
	    </button>
	    <SmallBase/>
	    {/*<LargeBase/>*/}
    </div>
  );
}

export default App;
