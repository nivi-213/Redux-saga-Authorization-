import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersRequest, deleteUser } from "../action/authAction";
import { useNavigate } from "react-router-dom";
import "./userTable.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
const AdminTable = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleDelete = (email) => {
    if (window.confirm("Are you sure you want to delete this Admin?")) {
      dispatch(deleteUser(email));
       navigate("/login");
      window.location.reload();
     
    }
  };
  const openNew = () => {
    navigate("/signup");
  };

  return (
    <div className="container mt-5 tab-style">
      <div className="card">
      <div className="d-flex mb-3">
          <button className="rounded" onClick={openNew}>
            <i className="fas fa-plus"></i> New
          </button>
          <h2 className="ms-4 mt-2">User Profile</h2>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.mobileNo}</td>
                  <td>{user.status}</td>
                  <td>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleDelete(user.email)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTable;
