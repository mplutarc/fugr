import React, {useMemo, useEffect, useState} from 'react'
import {COLUMNS} from "./columns";
import {useTable, useSortBy, useFilters} from "react-table";
import axios from "axios";

const SmallBase = () =>{

	const [filterInput, setFilterInput] = useState("");
	const [users, setData] = useState([]);
	useEffect(() => {
		(async () => {
			const result = await axios("http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}");
			setData(result.data);
		})();
	}, []);

	const columns = useMemo(() => COLUMNS,[]);
	const data = users;
	const tableInstance = useTable(
		{columns, data,}, useFilters, useSortBy);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		setFilter
	} = tableInstance;
	const handleFilterChange = e => {
		const value = e.target.value || undefined;
		setFilter("firstName", value);
		setFilterInput(value);
	};

	if (!users)
		return <div>no data</div>;
	else
		return (
			<div>
				<input
					value={filterInput}
					onChange={handleFilterChange}
					placeholder={"Search name"}
				/>
				<table {...getTableProps}>
					<thead>
					{headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<th
									{...column.getHeaderProps(column.getSortByToggleProps())}
									className={
										column.isSorted
											? column.isSortedDesc
											? "sort-desc"
											: "sort-asc"
											: ""
									}>
									{column.render("Header")}
									</th>
								))
							}
						</tr>
					))}
					</thead>
					<tbody {...getTableBodyProps}>
					{
						rows.map(row => {
							prepareRow(row)
							return(
								<tr {...row.getRowProps}>
									{
										row.cells.map(cell => {
											return <td {...cell.getCellProps}>{cell.render('Cell')}</td>
										})
									}
								</tr>
							)
						})
					}

					</tbody>
					{/*<tr>*/}
					{/*	<th>First name</th>*/}
					{/*	<th>Last name</th>*/}
					{/*	<th>Email</th>*/}
					{/*	<th>Phone</th>*/}
					{/*</tr>*/}
					{/*{this.state.users.map((user) => (*/}
					{/*	<tr>*/}
					{/*		<td key={user.id}>{user.firstName}</td>*/}
					{/*		<td>{user.lastName}</td>*/}
					{/*		<td>{user.email}</td>*/}
					{/*		<td>{user.phone}</td>*/}
					{/*	</tr>*/}
					{/*))}*/}
				</table>
			</div>
		);
}
export default SmallBase
