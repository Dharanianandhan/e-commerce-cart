import { Link, NavLink, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="sidebar-wrapper">
      <nav id="sidebar">
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo-link" aria-label="EEC Cart">
            <img src="/images/logo.png" alt="EEC Cart" className="sidebar-logo" />
          </Link>
        </div>

        <ul className="sidebar-menu">
          <li>
            <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
              <i className="fas fa-tachometer-alt"></i>
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavDropdown title={
              <>
                <i className="fas fa-cube"></i>
                <span>Products</span>
              </>
            } className="sidebar-dropdown">
              <NavDropdown.Item onClick={() => navigate('/admin/products')}>
                <i className="fas fa-list"></i>
                All
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/admin/products/create')}>
                <i className="fas fa-plus"></i>
                Create
              </NavDropdown.Item>
            </NavDropdown>
          </li>

          <li>
            <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? "active" : "")}>
              <i className="fas fa-shopping-cart"></i>
              Orders
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/users" className={({ isActive }) => (isActive ? "active" : "")}>
              <i className="fas fa-users"></i>
              Users
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/reviews" className={({ isActive }) => (isActive ? "active" : "")}>
              <i className="fas fa-star"></i>
              Reviews
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}