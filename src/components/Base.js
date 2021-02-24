import React, {useMemo, useEffect, useState} from 'react'
import {COLUMNS} from "./columns";
import {useTable, useSortBy, useFilters, usePagination, useGlobalFilter, useAsyncDebounce} from "react-table";
import axios from "axios";
import Button from "@material-ui/core/Button";
import {AddForm} from "./AddForm";

const Base = ({size,link}) =>{
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [currentInfo, setCurrentInfo] = useState(null);
	useEffect(() => {
		(async () => {
			const result = await axios(link);
			setData(result.data);
			setLoading(false)
		})();
	}, []);

	function GlobalFilter({
		                      preGlobalFilteredRows,
		                      setGlobalFilter,
	                      }) {
		const count = preGlobalFilteredRows.length
		const [filterString, setFilterString] = useState("");

		return (
			<span>
				<input
					value={filterString}
					onChange={e => {
						setFilterString(e.target.value);
					}}
					placeholder={`${count} records...`}
				/>
				<Button onClick={() => setGlobalFilter(filterString)}>
					Search
				</Button>
    </span>
		)
	}
	function ShowInfo({info}) {
		console.log(info)
		return(
			<div>
				<div>
					Выбран пользователь: <b>{info.firstName +" "+ info.lastName}</b>
				</div>
				<div>
				Описание:
					<textarea>
						{info.description}
					</textarea>
				</div>
				<div>
					Адрес проживания: <b>{info.address.streetAddress + "\n"}</b>
				</div>
				<div>
					Город: <b>Waukesha</b>
				</div>
				<div>
					Провинция/штат: <b>WI</b>
				</div>
				<div>
					Индекс: <b>22178</b>
				</div>
			</div>
		)
	}
	const columns = useMemo(() => COLUMNS,[]);
	const tableInstance = useTable(
		{
			columns,
			data,
			initialState: { pageSize: 20},
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
	if (!data)
		return <div>no data</div>;
	else if (loading)
		return <div className={size}>...loading data, please wait...</div>
	else
		return (
			<div className={size}>
				<AddForm onSubmit={(e) => {
					const tmpData = [e, ...data];
					console.log(tmpData);
					setData(tmpData);
				}} />
				<GlobalFilter
					preGlobalFilteredRows={preGlobalFilteredRows}
					globalFilter={globalFilter}
					setGlobalFilter={setGlobalFilter}
				/>
				<table {...getTableProps()}>
					<thead>
					{headerGroups.map(headerGroup => (
						<tr  {...headerGroup.getHeaderGroupProps()}>
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
								<tr {...row.getRowProps()}>
									{
										row.cells.map(cell => {
											return <td {...cell.getCellProps()}
											           onClick={() => setCurrentInfo(row.original)}>{cell.render('Cell')}</td>
										})
									}
								</tr>
							)
						})
					}

					</tbody>
				</table>
				<div>
					<Button variant="outlined" size="small"
					        onClick={() => previousPage()} disabled={!canPreviousPage}>
						Previous Page
					</Button>
					<Button variant="outlined" size="small"
					        onClick={() => nextPage()} disabled={!canNextPage}>
						Next Page
					</Button>
					<div>
						Page{' '}
						<em>
							{pageIndex + 1} of {pageOptions.length}
						</em>
					</div>
				</div>
				{currentInfo && <ShowInfo info={currentInfo}/>}
			</div>
		);
}
export default Base
