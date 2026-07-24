import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage.jsx";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app">
      {user ? (
        <DashboardPage user={user} onLogout={() => setUser(null)} />
      ) : (
        <AuthPage onLogin={setUser} />
      )}
    </div>
  );
}
