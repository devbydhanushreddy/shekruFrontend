import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../style/login.css";
import Loader from "./Loader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", { email, password });

      if (res.request.responseURL.includes("/dashboard")) {
        navigate("/dashboard");
      } else {
        setLoading(false);
        navigate("/otp");
      }
    } catch (err) {
      setErr(err.status);
      setLoading(false);
    }
  };

  return (
    <div>
      {/* ================= TOP BAR ================= */}
      <div className="top-bar">
        <span>Mon-Sat 09:00 AM - 9:00 PM | Sun: Closed</span>
        <span>📞 +91 7776827177 | +91 9172530151 | ✉ info@shekruweb.com</span>
      </div>

      {/* ================= HEADER ================= */}
      <header className="header">
        <div className="logo">
          <img
            src="https://www.shekruweb.com/static/media/logo.bd9dfc74dd8181409bfa.png"
            alt="Shekru Lab"
          />
        </div>

        <nav>
          <ul className="nav">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Products</li>
            <li>Partners</li>
            <li>Careers</li>
            <li>Clients</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>

      {/* ================= HERO LOGIN ================= */}
      <section className="hero">
        {loading ? (
          <Loader />
        ) : (
          <form className="login-card" onSubmit={handleLogin}>
            <h2>User Management System</h2>

            <input
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
                setErr(null);
              }}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                setErr(null);
              }}
            />

            {err && email && password && (
              <p className="error">
                {err === 404
                  ? "Wrong email"
                  : err === 401
                  ? "Wrong password"
                  : "Email not verified"}
              </p>
            )}

            <button type="submit">Login</button>
          </form>
        )}
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features">
        <div className="feature">💰 Saving Investments</div>
        <div className="feature">🌐 Online Consulting</div>
        <div className="feature">🚀 Tech Innovation</div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="about">
        <h2>Shekru Lab: Your IT Partner</h2>
        <p>
          Founded in 2018, Shekru Lab delivers professional IT services with
          unmatched expertise, ensuring timely delivery and confidentiality.
        </p>
        <h4>Anil Shinde</h4>
        <p>CEO, Shekru Lab</p>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="contact">
        <h2>Contact Us</h2>
        <p>Office no 6, 2nd Floor Manogat Appt, Pune - 411009</p>
        <p>📞 +91 7776827177 | ✉ info@shekruweb.com</p>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Shekru Lab. All Rights Reserved.
      </footer>
    </div>
  );
}
