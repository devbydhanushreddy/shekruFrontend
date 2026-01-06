import { useEffect, useState } from "react";
import api from "../api";

export default function UserModal({ isOpen, onClose, editUser, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  useEffect(() => {
    if (editUser) {
      setForm({ ...editUser, password: "" });
    }
  }, [editUser]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editUser) {
      await api.put(`/user/${editUser._id}`, form);
    } else {
      await api.post("/add/user", form);
    }

    onSuccess();
    onClose();
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3 style={{ marginBottom: "15px" }}>
          {editUser ? "Edit User" : "Add User"}
        </h3>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          {!editUser && (
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          )}

          <select name="role" value={form.role} onChange={handleChange}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          <div style={{ marginTop: "15px", textAlign: "right" }}>
            <button type="button" onClick={onClose} style={cancelBtn}>
              Cancel
            </button>
            <button type="submit" style={saveBtn}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* 🎨 Styles */
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  background: "#fff",
  padding: "25px",
  width: "400px",
  borderRadius: "10px",
  boxShadow: "0 10px 25px rgba(0,0,0,.2)",
};

const cancelBtn = {
  marginRight: "10px",
  background: "#e5e7eb",
  padding: "8px 14px",
  border: "none",
  borderRadius: "6px",
};

const saveBtn = {
  background: "#4f46e5",
  color: "#fff",
  padding: "8px 14px",
  border: "none",
  borderRadius: "6px",
};
