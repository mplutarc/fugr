import React, {useMemo, useEffect, useState} from 'react'
import {COLUMNS} from "./columns";
import {useTable, useSortBy, useFilters, usePagination, useGlobalFilter, useAsyncDebounce} from "react-table";
import axios from "axios";

const SmallBase = () =>{
	let state = {}
	const [loading, setLoading] = useState(true);
	const [users, setData] = useState([]);
	useEffect(() => {
		(async () => {
			const result = await axios("http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}");
			setData(result.data);
			setLoading(false);
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

	function showData(info) {
		console.log(info);
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
		state: {pageIndex},
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
		return <div className="small">...loading data, please wait...</div>
	else
		return (
			<div className="small">
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
					<button onClick={() => previousPage()} disabled={!canPreviousPage}>
						Previous Page
					</button>
					<button onClick={() => nextPage()} disabled={!canNextPage}>
						Next Page
					</button>
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
export default SmallBase
