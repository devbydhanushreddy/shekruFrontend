import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../api";

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  useEffect(() => {
    if (id) {
      api.get(`/user/${id}`).then((res) => {
        setForm({ ...res.data, password: "" });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await api.put(`/user/${id}`, form);
    } else {
      await api.post("/add/user", form);
    }

    navigate("/dashboard");
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <form onSubmit={handleSubmit} style={{ width: "350px", padding: "20px" }}>
        <h3>{id ? "Edit User" : "Add User"}</h3>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
          required
        />

        {!id && (
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

        <button type="submit" style={{ marginTop: "15px" }}>
          Submit
        </button>
      </form>
    </div>
  );
}
