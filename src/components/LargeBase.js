import React, {useState, useEffect} from 'react'
import axios from 'axios';

export default class LargeBase extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			// data: null,
			hits: []
		};
	}

	async componentDidMount() {
		const url = "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
		fetch(url)
			.then(response => response.json())
			.then(data => this.setState({hits: data.hits}));
		this.state.loading = false;
	}

	render() {
		return <div></div>;
	}

}