import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { SERVER_URL } from "../services/server_url"


const EmpDetail = () => {
  const { empid } = useParams();
  const [empdata, empdatachange] = useState({});

  useEffect(() => {
    fetch(`${SERVER_URL}/` + empid).then((res) => {
      return res.json();
    }).then((resp) => {
      empdatachange(resp);
    }).catch((err) => {
      console.log(err.message);
    })
  }, []);
  return (
    <div>
      <h1 className='text-center pt-5'>Employee Details</h1>

      <div className="container pt-5" style={{ paddingLeft: "15vw", paddingRight: "15vw" }}>
        <div className="card row rounded " style={{ "textAlign": "left" }}>
          <div>
            <div className="row ps-5 pt-5" style={{ margin: "0", fontSize: "18px" }} >
              <div className="col-md">
                <Table className="table">
                  <thead ></thead>

                  {empdata &&
                    <tbody>
                      <tr>
                        <td>Employee Name</td>
                        <td>{empdata.name}</td>
                      </tr>
                      <tr>
                        <td>Employee ID</td>
                        <td>{empdata.id}</td>
                      </tr>
                      <tr>
                        <td colSpan={2} style={{ fontWeight: "bold" }}>Contact Details:</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{empdata.email}</td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td> {empdata.phone}</td>
                      </tr>
                    </tbody>
                  }
                </Table>
              </div>
            </div>

            <Link className="btn btn-danger rounded my-3 float-end" to="/">Back to Listing</Link>

          </div>

        </div>
      </div>
    </div >
  );
}

export default EmpDetail;