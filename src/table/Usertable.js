// UserTable.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, updateUser, deleteUser } from '../action/authAction';

const UserTable = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const error = useSelector((state) => state.user.error);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    userName: '',
    email: '',
    mobileNo: '',
    status: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const useremail = localStorage.getItem('email');

    if (token && useremail) {
      dispatch(fetchUser(useremail));
    }
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      setFormData({
        id: userData.Details.id,
        userName: userData.Details.userName,
        email: userData.Details.email,
        mobileNo: userData.Details.mobileNo,
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

  const handleEdit = () => {
    dispatch(updateUser(formData));
    setIsEditing(false);
  };

  const handleDelete = () => {
    const useremail = localStorage.getItem('email');
    dispatch(deleteUser(useremail));
  };

  if (error) {
    return (
      <div>
        <p>Error: {error.reason || 'No error message available'}</p>
        <p>Timestamp: {error.timeStamp || 'No timestamp available'}</p>
      </div>
    );
  }

  return (
    <div className="container tab-style">
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
                Status:
                <input
                  className="form-control"
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                />
              </label>
              <button className="btn btn-primary" onClick={handleEdit}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <table className="table">
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
                    <td>{userData.Details.userName}</td>
                    <td>{userData.Details.email}</td>
                    <td>{userData.Details.mobileNo}</td>
                    <td>{userData.Details.status}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={handleDelete}>
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
  );
};

export default UserTable;
