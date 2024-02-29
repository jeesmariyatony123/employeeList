import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SERVER_URL } from "../services/server_url"

const EmpListing = () => {
    const [empdata, empdatachange] = useState(null)
    const navigate = useNavigate();

    const loadEdit = (id) => {
        navigate("/edit/" + id);
    }
    const removeFunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch( `${SERVER_URL}/` + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }
    const loadDetail = (id) => {
        navigate("/detail/" + id);
    }

    useEffect(() => {
        fetch("http://localhost:3000/employee").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    return (
        <div className='container ' >
            <h1 className='text-center py-5'>Employee Listing</h1>
            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-title">
                    {/* <h2>Employee Listing</h2> */}
                </div>
                <div className="card-body ">
                    <div className='divbtn'>
                        <Link to='/create' className="btn btn-success rounded mb-3">Add New (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-primary text-light text-center">
                            <tr>
                                <td className="bg-primary text-light">ID</td>
                                <td className="bg-primary text-light">Name</td>
                                <td className="bg-primary text-light">Email</td>
                                <td className="bg-primary text-light">Phone</td>
                                <td className="bg-primary text-light">Action</td>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {empdata &&
                                empdata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td><a onClick={() => { loadEdit(item.id) }} className='btn btn-success m-2 rounded'>Edit</a>
                                            <a onClick={() => { removeFunction(item.id) }} className='btn btn-danger m-2 rounded'>Remove</a>
                                            <a onClick={() => { loadDetail(item.id) }} className='btn btn-info m-2 rounded'>Details</a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default EmpListing