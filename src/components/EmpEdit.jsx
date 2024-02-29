import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../services/server_url"

const EmpEdit = () => {
  const { empid } = useParams();

  //const [empdata, empdatachange] = useState({});

  useEffect(() => {
    fetch(`${SERVER_URL}/` + empid).then((res) => {
      return res.json();
    }).then((resp) => {
      idchange(resp.id);
      namechange(resp.name);
      emailchange(resp.email);
      phonechange(resp.phone);
      activechange(resp.isactive);
    }).catch((err) => {
      console.log(err.message);
    })
  }, []);

  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [active, activechange] = useState(true);
  const [validation, valchange] = useState(false);


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const empdata = { id, name, email, phone, active };


    fetch(`${SERVER_URL}/` + empid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata)
    }).then((res) => {
      alert('Saved successfully.')
      navigate('/');
    }).catch((err) => {
      console.log(err.message)
    })

  }
  return (
    <div>
      <h1 className='text-center py-5'>Edit Employee Details</h1>

      <div className='employeecreate'>
        <div className='row'>
          <div className="offset-lg-3 col-lg-6">
            <form className="container" onSubmit={handleSubmit}>
              <div className=" card shadow p-3 mb-5 bg-white rounded" style={{ backgroundColor: "#E8E9EB", borderRadius: "8px" }}>
                <div className="card-title ps-2">
                  {/* <h2>Employee Create</h2> */}
                </div>
                <div className="card-body">
                  <div className='row'>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>ID</label>
                        <input value={id} disabled="disabled" className='form-control mb-2' />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Name</label>
                        <input required value={name} onMouseDown={e => valchange(true)} onChange={e => namechange(e.target.value)} className='form-control rounded' />
                        {name.length == 0 && validation && <span className="text-danger mb-2" style={{ fontSize: "12px" }}>Please enter Name</span>}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Email</label>
                        <input value={email} onChange={e => emailchange(e.target.value)} className='form-control mb-2 rounded' />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Phone</label>
                        <input value={phone} onChange={e => phonechange(e.target.value)} className='form-control mb-2 rounded' />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-check">
                        <input checked={active} onChange={e => activechange(e.target.checked)} type='checkbox' className='form-check-input' />
                        <label className='form-check-label'>Is Active</label>
                      </div>
                    </div>
                    <div className='col-lg-12 mt-3'>
                      <div className="form-group">
                        <button className='btn btn-success rounded mx-2 ' type='submit'>Save</button>
                        <Link to="/" className="btn btn-danger rounded mx-1">Back</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>    </div>
  );
}

export default EmpEdit;