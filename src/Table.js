import React from 'react';
import './App.css'
const Table = ({tableData}) => {
    tableData.sort((a, b) => b.cases -a.cases)
    return (
        <div className='table-div'>
            <table className="table table-striped">
                <tbody>
                {
                    tableData.map((country, index) =>
                        <tr>
                            <td>{country.country}</td>
                            <td className='text-right'>{country.cases}</td>
                        </tr>)
                }
                </tbody>
            </table>
        </div>
    );
};

export default Table;
