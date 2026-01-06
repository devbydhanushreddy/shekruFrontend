import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../style/otp.css";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/auth/verify-otp", { otp });
      navigate("/dashboard");
    } catch (err) {
      setErr(err.response?.data || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-page">
      {loading && (
        <div className="loader-overlay">
          <div className="spinner"></div>
          <p>Verifying OTP...</p>
        </div>
      )}

      <div className="otp-card">
        <h2>Enter OTP</h2>
        <p>We have sent an OTP to your registered email/phone</p>
        <form onSubmit={verifyOtp}>
          <input
            type="text"
            maxLength={6}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              setErr(null);
            }}
            required
          />
          {err && <p className="error">{err}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
