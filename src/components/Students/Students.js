import React, { useEffect, useState } from 'react';
import './Students.css';

const Students = () => {
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 10;
    const handleOnClick = value => {
        if (value === -1 && page > 0) {
            setPage(page + value);
        }
        if (value === 1 && page < pageCount - 1) {
            setPage(page + value)
        }
    }
    //api call
    useEffect(() => {
        fetch(`http://localhost:5000/students?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setData(data.result);
                const count = data.numberOfResult;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber);
            })

    }, [page])

    return (
        <div>
            <h1 className='text-center'>Students List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(student => <tr
                            key={student.ID}
                        >
                            <th scope="row">{student.ID}</th>
                            <td>{student.fullname}</td>
                            <td>{student.email}</td>
                        </tr>)
                    }
                </tbody>
            </table>
            <div className='pagination d-flex justify-content-between'>
                <div>
                    <h6>Total Page: {pageCount}</h6>

                </div>
                <div>
                    <button onClick={() => handleOnClick(-1)}>Previous</button>

                    {
                        [...Array(pageCount).keys()].slice(page, page + 1)
                            .map(number => <button
                                className={number === page ? 'selected' : ''}
                                key={number}
                                onClick={() => setPage(number)}
                            >{number + 1}</button>)

                    }

                    <button onClick={() => handleOnClick(1)}>Next</button>
                </div>

            </div>

        </div>
    );
};

export default Students;