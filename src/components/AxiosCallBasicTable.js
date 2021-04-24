import React, { useMemo } from 'react'
import { useTable, useGlobalFilter, useFilters, useSortBy } from 'react-table'
import { COLUMNS} from './IPMcolumns'
import './table.css'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'

export const AxiosCallBasicTable = (props) => {
    // alert("dat")
   const columns = useMemo(() => COLUMNS, [] )
    const data = useMemo(() => props.userData, [])
    const defaultColumn = useMemo(() => {
        return {
            Filter : ColumnFilter
        }
    },[])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable(
                    {
                        columns: columns,
                        data : data,
                        defaultColumn : defaultColumn
                    },
                    useFilters,
                    useGlobalFilter,
                    useSortBy
                )

    return (
        <>
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map((headerGroup) =>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map( column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? <span>&#8595;</span> : <span>&#8593;</span>) : ''}
                                        </span>
                                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row =>{
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </>
    )
}
