import './App.css';
import SmallBase from "./components/SmallBase";
import LargeBase from "./components/LargeBase";
import React from "react";
import {Button} from "@material-ui/core";

function App() {

	window.onload = function () {
		document.body.classList.add('loaded_hiding');
		window.setTimeout(function () {
			document.body.classList.add('loaded');
			document.body.classList.remove('loaded_hiding');
		}, 500);
	}
	function showSmall() {
		document.getElementsByClassName('small')[0].style = "visibility: visible";
		document.getElementsByClassName('large')[0].style = "visibility: hidden";
	}
	function showLarge() {
		document.getElementsByClassName('small')[0].style = "visibility: hidden";
		document.getElementsByClassName('large')[0].style = "visibility: visible";
	}

  return (
    <div className="App">
		<div className="buttons">
			<Button onClick={showSmall}>
			    Show small base
		    </Button>
		    <Button onClick={showLarge}>
			    Show large base
			</Button>
		</div>
	    <LargeBase/>
	    <SmallBase/>
    </div>
  );
}

export default App;
