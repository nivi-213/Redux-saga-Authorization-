import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { fetchUsersRequest, deleteUser } from "../action/authAction";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AdminTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state);

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

  const columns = [
    { field: "userName", headerName: "User Name", width: 180 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "mobileNo", headerName: "Mobile Number", width: 180 },
    { field: "status", headerName: "Status", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(params.row.email)}
        >
          Delete
        </button>
      )
    }
  ];

  const rows = users.map((user) => ({
    id: user.userId,
    userName: user.userName,
    email: user.email,
    mobileNo: user.mobileNo,
    status: user.status
  }));

  return (
    <div className="container mt-5">
      <div className="d-flex mb-3">
        <button className="btn btn-primary" onClick={openNew}>
          <i className="fas fa-plus"></i> New
        </button>
        <h2 className="ms-4">User Profile</h2>
      </div>
      <div style={{ height: 400, width: "950px", }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default AdminTable;
