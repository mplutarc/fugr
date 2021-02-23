import React, {useMemo, useEffect, useState} from 'react'
import {COLUMNS} from "./columns";
import {useTable, useSortBy, useFilters, usePagination, useGlobalFilter, useAsyncDebounce} from "react-table";
import axios from "axios";
import Button from "@material-ui/core/Button";

const LargeBase = () =>{
	let state = {}
	const [loading, setLoading] = useState(true);
	const [users, setData] = useState([]);
	useEffect(() => {
		(async () => {
			const result = await axios("http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}");
			setData(result.data);
			setLoading(false)
		})();
	}, []);

	function GlobalFilter({
		                      preGlobalFilteredRows,
		                      globalFilter,
		                      setGlobalFilter,
	                      }) {
		const count = preGlobalFilteredRows.length
		const [value, setValue] = React.useState(globalFilter)
		const onChange = useAsyncDebounce(value => {
			setGlobalFilter(value || undefined)
		}, 200)

		return (
			<span>
      Search:{' '}
				<input
					value={value || ""}
					onChange={e => {
						setValue(e.target.value);
						onChange(e.target.value);
					}}
					placeholder={`${count} records...`}
					style={{
						fontSize: '1.1rem',
						border: '0',
					}}
				/>
    </span>
		)
	}

	const columns = useMemo(() => COLUMNS,[]);
	const data = users;
	const tableInstance = useTable(
		{
			columns,
			data,
			initialState: { pageSize: 50},
		}, useFilters, useGlobalFilter, useSortBy, usePagination);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		pageOptions,
		state: { pageIndex, globalFilter},
		previousPage,
		nextPage,
		canPreviousPage,
		canNextPage,
		preGlobalFilteredRows,
		setGlobalFilter,
	} = tableInstance;
	if (!users)
		return <div>no data</div>;
	else if (loading)
		return <div className="large">...loading data, please wait...</div>
	else
		return (
			<div class="large">
				<GlobalFilter
					preGlobalFilteredRows={preGlobalFilteredRows}
					globalFilter={state.globalFilter}
					setGlobalFilter={setGlobalFilter}
				/>
				<table {...getTableProps}>
					<thead>
					{headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<th
									{...column.getHeaderProps(column.getSortByToggleProps())}>
									<span>
										{column.isSorted
											? column.isSortedDesc
												? '↑'
												: '↓'
											: ""
										}
									</span>
									{column.render("Header")}
								</th>
							))
							}
						</tr>
					))}
					</thead>
					<tbody {...getTableBodyProps}>
					{
						page.map(row => {
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
				</table>
				<div>
					<Button onClick={() => previousPage()} disabled={!canPreviousPage}>
						Previous Page
					</Button>
					<Button onClick={() => nextPage()} disabled={!canNextPage}>
						Next Page
					</Button>
					<div>
						Page{' '}
						<em>
							{pageIndex + 1} of {pageOptions.length}
						</em>
					</div>
				</div>
			</div>
		);
}
export default LargeBase
