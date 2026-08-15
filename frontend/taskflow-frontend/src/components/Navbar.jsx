function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="brand">
        <div className="brand-icon">T</div>
        <span>TaskFlow</span>
      </div>

      <div className="nav-right">
        <span className="user-name">{user?.name}</span>

        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
