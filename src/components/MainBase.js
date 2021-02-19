import React from 'react'

export default class MainBase extends React.Component{

    state = {
        loading:true,
        person: null,
    };
    firstName;


    async componentDidMount() {
        const url = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        this.setState({person:data, loading: false})
    }

    render() {
        return <div>
            {this.state.loading ? (
                <div>loading..</div>
                ) : (
                <div>
                    <div>{this.state.person.id}</div>
                    <div>{this.state.person.firstName}</div>
                    <div>{this.state.person.email}</div>
                    <div>{this.state.person.phone}</div>
                </div>
            )}
        </div>;
    }
}