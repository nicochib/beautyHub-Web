import { useState } from "react";
import "./AuthPage.css";

export default function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ 
    firstName: "", lastName: "", 
    email: "", address: "", password: "" 
  });
  const [error, setError] = useState("");

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async () => {
    setError("");
    try {
      const url = mode === "login" 
        ? "http://localhost:8080/api/members/login"
        : "http://localhost:8080/api/members/register";
      
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(await res.text());
      const user = await res.json();
      onLogin(user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo">✦</span>
          <h1>Beauty Hub</h1>
          <p>Borrow, donate & discover beauty</p>
        </div>

        <div className="auth-tabs">
          <button className={mode === "login" ? "active" : ""} 
            onClick={() => setMode("login")}>Login</button>
          <button className={mode === "register" ? "active" : ""} 
            onClick={() => setMode("register")}>Register</button>
        </div>

        <div className="auth-form">
          {mode === "register" && (
            <>
              <input placeholder="First Name" value={form.firstName} onChange={set("firstName")} />
              <input placeholder="Last Name" value={form.lastName} onChange={set("lastName")} />
              <input placeholder="Address" value={form.address} onChange={set("address")} />
            </>
          )}
          <input placeholder="Email" type="email" value={form.email} onChange={set("email")} />
          <input placeholder="Password" type="password" value={form.password} onChange={set("password")} />

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-submit" onClick={handleSubmit}>
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
