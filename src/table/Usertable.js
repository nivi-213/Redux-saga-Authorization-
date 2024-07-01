// UserTable.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, updateUser, deleteUser } from "../action/authAction";
import { useNavigate } from "react-router-dom";
const UserTable = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNo: "",
    userRole: "",
    status: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    const useremail = localStorage.getItem("email");
    if (token && useremail) {
      dispatch(fetchUser(useremail));
    }
  }, [dispatch]);

  useEffect(() => {
    if (userData && userData.Details) {
      setFormData({
        userId: userData.Details.userId,
        userName: userData.Details.userName,
        email: userData.Details.email,
        mobileNo: userData.Details.mobileNo,
        password: userData.Details.password,

        confirmPassword: userData.Details.confirmPassword,

        status: userData.Details.status,
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // const handleupdate = () => {
  //   dispatch(updateUser(formData));
  //   console.log(formData);
  //   setIsEditing(false);

  // };
  const handleupdate = () => {
    dispatch(updateUser(formData));
    setIsEditing(false);
    const useremail = localStorage.getItem("email");
    if (useremail) {
      dispatch(fetchUser(useremail));
    }
  };

  const handleEdit = (useremail) => {
    setFormData({
      userId: userData.userId,
      userName: userData.userName,
      email: userData.email,
      mobileNo: userData.mobileNo,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
      userRole:userData.userRole,
      status: userData.status,
    });
    dispatch(fetchUser(useremail));
    setIsEditing(true);
  };
  // useEffect(() => {
  //   dispatch(fetchUsersRequest());
  // }, [dispatch]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userData.email));
      navigate("/login");
    }
  };

  //   return (
  //     <div>
  //       <p>Error: {error.reason }</p>
  //       <p>Timestamp: {error.timeStamp || 'No timestamp available'}</p>
  //     </div>
  //   );
  // }

  return (
    <div className="container table-style mt-5 ">
      <div className="card">
        {userData ? (
          <div>
            <h2>User Profile</h2>
            {isEditing ? (
              <div>
                <label>
                  User Name:
                  <input
                    className="form-control"
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Email:
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Mobile Number:
                  <input
                    className="form-control"
                    type="text"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Password:
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  confirmPassword:
                  <input
                    className="form-control"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Status:
                  <input
                    className="form-control"
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  />
                </label>
                <button className="btn btn-primary" onClick={handleupdate}>
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="table-responsive container">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Email</th>
                      <th>Mobile Number</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{userData.userName}</td>
                      <td>{userData.email}</td>
                      <td>{userData.mobileNo}</td>
                      <td>{userData.status}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(userData.email)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserTable;
