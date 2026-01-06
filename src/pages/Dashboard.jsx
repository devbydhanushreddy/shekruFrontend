
import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router";
import "../style/dashboard.css";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [role, setRole] = useState("user");

  // pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  // ================= FETCH USERS (OTP PROTECTED) =================
  const fetchUsers = async (pageNo = page) => {
    try {
      const res = await api.get(`/dashboard?page=${pageNo}`, {
        withCredentials: true,
      });

      setUsers(res.data.users);
      setRole(res.data.role);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      // 🔐 OTP not verified → redirect to OTP page
      if (err.response?.data?.reason === "OTP_REQUIRED") {
        navigate("/otp");
      } else {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  // ================= LOGOUT =================
  const logout = async () => {
    try {
      await api.get("/api/logout", { withCredentials: true });
    } finally {
      navigate("/");
    }
  };

  // ================= ADD USER =================
  const openAdd = () => {
    setEditUser(null);
    setForm({ name: "", email: "", password: "", role: "user" });
    setShowPanel(true);
  };

  // ================= EDIT USER =================
  const openEdit = (user) => {
    setEditUser(user);
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setShowPanel(true);
  };

  // ================= SUBMIT =================
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (editUser) {
        await api.put(`/api/user/${editUser._id}`, form, {
          withCredentials: true,
        });
        alert("User updated");
      } else {
        await api.post("/add/user", form, {
          withCredentials: true,
        });
        alert("User created");
      }

      setShowPanel(false);
      fetchUsers(page);
    } catch (err) {
      alert(err.response?.data || "Something went wrong");
    }
  };

  // ================= DELETE =================
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await api.delete(`/api/user/${id}`, {
        withCredentials: true,
      });
      fetchUsers(page);
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="dashboard-container">
      {/* LEFT SIDE */}
      <div
        className="dashboard-left"
        style={{ flex: showPanel ? "65%" : "100%" }}
      >
        <div className="dashboard-header">
          <div className="logo">
            <img
              src="https://www.shekruweb.com/static/media/logo.bd9dfc74dd8181409bfa.png"
              alt="Logo"
            />
          </div>

          <h2>{role} Dashboard</h2>

          <div className="dashboard-actions">
            {role === "admin" && (
              <button className="btn-add" onClick={openAdd}>
                + Add User
              </button>
            )}
            <button className="btn-logout" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        {/* USERS TABLE */}
        <table
          className="user-table"
          border={1}
          style={{ textAlign: "center" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                {role === "admin" && (
                  <td>
                    <button className="btn-edit" onClick={() => openEdit(u)}>
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteUser(u._id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      {showPanel && (
        <div className="side-panel">
          <div className="panel-header">
            <h3>{editUser ? "Edit User" : "Add User"}</h3>
            <button className="panel-close" onClick={() => setShowPanel(false)}>
              ×
            </button>
          </div>

          <form onSubmit={submitForm}>
            <input
              className="panel-input"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className="panel-input"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              className="panel-input"
              type="password"
              placeholder={editUser ? "Password (optional)" : "Password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required={!editUser}
            />
            <select
              className="panel-input"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <button className="panel-save" type="submit">
              {editUser ? "Update User" : "Create User"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
