// // UserTable.js
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchUser, updateUser, deleteUser } from "../action/authAction";
// import { useNavigate } from "react-router-dom";
// import "./userTable.css";
// import '@fortawesome/fontawesome-free/css/all.min.css';

// const UserTable = () => {
//   const dispatch = useDispatch();
//   const userData = useSelector((state) => state.user);
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     userId: "",
//     userName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     mobileNo: "",
//     userRole: "",
//     status: "",
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const useremail = localStorage.getItem("email");
//     if (token && useremail) {
//       dispatch(fetchUser(useremail));
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     if (userData) {
//       setFormData({
//         userId: userData.userId || "",
//         userName: userData.userName || "",
//         email: userData.email || "",
//         password: userData.password || "",
//         confirmPassword: userData.confirmPassword || "",
//         mobileNo: userData.mobileNo || "",
//         userRole: userData.userRole || "",
//         status: userData.status || "",
//       });
//     }
//   }, [userData]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleUpdate = () => {
//     dispatch(updateUser(formData));
//     setIsEditing(false);
//     window.location.reload();
//   };

//   const handleEdit = (useremail) => {
//     setIsEditing(true);
//     dispatch(fetchUser(useremail));
//   };

//   const handleDelete = () => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       dispatch(deleteUser(userData.email));
//       navigate("/login");
//       window.location.reload();
//     }
//   };

//   const openNew = () => {
//     navigate("/signup");
//   };

//   return (
//     <div className="container table-style mt-5 ">
//       <div className="card">
//         <div className="d-flex mb-3">
//           <button className="rounded" onClick={openNew}>
//             <i className="fas fa-plus"></i> New
//           </button>
//           <h2 className="ms-4 mt-2">User Profile</h2>
//         </div>
//         {userData ? (
//           <div>
//             {isEditing ? (
//               <div>
//                 <label>
//                   User Name:
//                   <input
//                     className="form-control"
//                     type="text"
//                     name="userName"
//                     value={formData.userName}
//                     onChange={handleInputChange}
//                   />
//                 </label>
//                 <label>
//                   Email:
//                   <input
//                     className="form-control"
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                   />
//                 </label>
//                 <label>
//                   Mobile Number:
//                   <input
//                     className="form-control"
//                     type="text"
//                     name="mobileNo"
//                     value={formData.mobileNo}
//                     onChange={handleInputChange}
//                   />
//                 </label>
//                 <label>
//                   Password:
//                   <input
//                     className="form-control"
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                   />
//                 </label>
//                 <label>
//                   Confirm Password:
//                   <input
//                     className="form-control"
//                     type="password"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                   />
//                 </label>
//                 <label>
//                   Status:
//                   <input
//                     className="form-control"
//                     type="text"
//                     name="status"
//                     value={formData.status}
//                     onChange={handleInputChange}
//                   />
//                 </label>
//                 <button className="btn btn-primary" onClick={handleUpdate}>
//                   Save
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => setIsEditing(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ) : (
//               <div className="table-responsive container">
//                 <table className="table table-striped">
//                   <thead>
//                     <tr>
//                       <th>User Name</th>
//                       <th>Email</th>
//                       <th>Mobile Number</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>{userData.userName}</td>
//                       <td>{userData.email}</td>
//                       <td>{userData.mobileNo}</td>
//                       <td>{userData.status}</td>
//                       <td>
//                         <button
//                           className="btn btn-primary"
//                           onClick={() => handleEdit(userData.email)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="btn btn-danger ms-2"
//                           onClick={handleDelete}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserTable;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, updateUser, deleteUser } from "../action/authAction";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Card, CardHeader, CardContent } from "@mui/material";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./userTable.css";

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
    if (userData) {
      setFormData({
        userId: userData.userId || "",
        userName: userData.userName || "",
        email: userData.email || "",
        password: "",
        confirmPassword: "",
        mobileNo: userData.mobileNo || "",
        userRole: userData.userRole || "",
        status: userData.status || "",
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

  const handleUpdate = () => {
   
    dispatch(updateUser(formData));
    setIsEditing(false);
    window.location.reload();
  };

  const handleEdit = (useremail) => {
    setIsEditing(true);
    dispatch(fetchUser(useremail));
  
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userData.email));
      navigate("/login");
      window.location.reload();
    }
  };

  const openNew = () => {
    navigate("/signup");
  };

  return (
    <div className="container table-style mt-5">
      <div className="">
        {userData ? (
          <div className="">
            {isEditing ? (
              <div className="form-container">
                <h2 className="ms-4 mt-2">User Update</h2>
                <form onSubmit={handleUpdate} className="p-4">
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="User Name"
                        name="userName"
                        value={formData.userName}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Mobile Number"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </Grid>
                  <div className="button-group mt-4">
                    <Button variant="contained" color="primary" type="submit">
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setIsEditing(false)}
                      style={{ marginLeft: "10px" }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <Card className="table-responsive container">
                <CardHeader className="d-flex mb-3">
                  <Button className="rounded btn btn-primary" onClick={openNew}>
                    <i className="fas fa-plus"></i> New
                  </Button>
                
                </CardHeader>
                  <CardContent>
                  <h2 className="">User Profile</h2>
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
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEdit(userData.email)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleDelete}
                            style={{ marginLeft: "10px" }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
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
