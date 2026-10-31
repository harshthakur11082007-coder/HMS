
import React, { useState } from "react";
import { loginPageStyles, toastStyles } from "../assets/dummyStyles";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const STORAGE_KEY = "doctorToken_v1";
const API_BASE = import.meta.env.VITE_API_URL || "https://hms-backend-0jzu.onrender.com";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      toast.error("All fields are required.", {
        style: toastStyles.errorToast,
      });
      return;
    }

    setBusy(true);

    try {
      const res = await fetch(`${API_BASE}/api/doctors/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json?.message || "Login failed");
      }

      const token = json?.token || json?.data?.token;

      const doctor =
        json?.doctor ||
        json?.data?.doctor ||
        json?.data;

      const doctorId = doctor?._id || doctor?.id;

      if (!token || !doctorId) {
        throw new Error("Invalid login response from server.");
      }

      localStorage.setItem(STORAGE_KEY, token);

      // Notify same-tab components if they listen for this custom event.
      window.dispatchEvent(
        new CustomEvent("doctorAuthChanged", {
          detail: { token },
        })
      );

      toast.success("Login successful!", {
        style: toastStyles.successToast,
      });

      navigate(`/doctor-admin/${doctorId}`, { replace: true });

    } catch (err) {
      console.error("Login error:", err);

      toast.error(err.message || "Network error during login", {
        style: toastStyles.errorToast,
      });

    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={loginPageStyles.mainContainer}>
      <Toaster position="top-right" reverseOrder={false} />

      <button
        onClick={() => navigate("/")}
        className={loginPageStyles.backButton}
        type="button"
      >
        <ArrowLeft className={loginPageStyles.backButtonIcon} />
        Back to Home
      </button>

      <div className={loginPageStyles.loginCard}>
        <div className={loginPageStyles.logoContainer}>
          <img src={logo} alt="logo" className={loginPageStyles.logo} />
        </div>

        <h2 className={loginPageStyles.title}>Doctor Admin</h2>

        <p className={loginPageStyles.subtitle}>
          Sign in to manage your profile & schedule
        </p>

        <form onSubmit={handleLogin} className={loginPageStyles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={loginPageStyles.input}
            required
            autoComplete="email"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={loginPageStyles.input}
            required
            autoComplete="current-password"
          />

          <button
            type="submit"
            disabled={busy}
            className={loginPageStyles.submitButton}
          >
            {busy ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
