import React, {useMemo} from 'react'


class SmallBase extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			users: []
		};
	}

	async componentDidMount() {
		const url = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
		await fetch(url)
			.then(response => response.json())
			.then(users => {
				this.setState({users})
			});
		this.setState({loading:false})
		console.log(this.state.users);
	}

	render() {


		if (this.state.loading)
			return <div>...loading...</div>
		else if (!this.state.users)
			return <div>no data</div>;
		else
			return (
				<div>
					<table>
						<tr>
							<th>First name</th>
							<th>Last name</th>
							<th>Email</th>
							<th>Phone</th>
						</tr>
						{this.state.users.map((user) => (
							<tr>
								<td key={user.id}>{user.firstName}</td>
								<td>{user.lastName}</td>
								<td>{user.email}</td>
								<td>{user.phone}</td>
							</tr>
						))}
					</table>

				</div>
			);
	}
}
export default SmallBase