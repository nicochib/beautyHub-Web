export default function DashboardPage({ user, onLogout }) {
    return (
    <div style={{ padding: "2rem" }}>
    <h1>Welcome to BeautyHub</h1>
    
    <p>
    {user?.firstName
    ? `Hello, ${user.firstName}!`
    : "You are logged in."}
    </p>
    
    <button onClick={onLogout}>
    Logout
    </button>
    </div>
    );
    }
    