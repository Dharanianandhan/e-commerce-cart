
import React from 'react';
import Search from './Search';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Image } from 'react-bootstrap';
import { logout } from '../../actions/userActions';

export default function Header() {

    const { isAuthenticated, user } = useSelector(
        state => state.authState
    );

    const { items: cartItems } = useSelector(
        state => state.cartState
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <nav className="navbar row">

            {/* Logo */}
            <div className="col-12 col-md-3">

                <div className="navbar-brand">

                    <Link to="/" className="sidebar-logo-link navbar-logo-link">
                        <img src="/images/logo.png" alt="EEC Cart" className="navbar-logo" />
                    </Link>

                </div>

            </div>

            {/* Search */}
            <div className="col-12 col-md-6 mt-2 mt-md-0">

                <Search />

            </div>

            {/* Right Side */}
            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">

                {isAuthenticated ? (

                    <Dropdown className="d-inline">

                        <Dropdown.Toggle
                            variant="default text-white pr-5"
                            id="dropdown-basic"
                        >

                            <figure className="avatar avatar-nav d-inline-block mb-0 me-2">

                                <Image
                                    width="50"
                                    height="50"
                                    roundedCircle
                                    className="border border-light"
                                    src={user?.avatar || "/images/default_avatar.jpg"}
                                    alt="User Avatar"
                                />

                            </figure>

                            <span className="ms-2">

                                {user?.name}

                            </span>

                        </Dropdown.Toggle>

                        <Dropdown.Menu>

                            {user?.role === "admin" && (
                                <Dropdown.Item
                                    onClick={() => navigate('/admin/dashboard')}
                                >
                                    Dashboard
                                </Dropdown.Item>
                            )}

                            <Dropdown.Item
                                onClick={() => navigate('/myprofile')}
                            >
                                Profile
                            </Dropdown.Item>

                            <Dropdown.Item
                                onClick={() => navigate('/orders')}
                            >
                                Orders
                            </Dropdown.Item>

                            <Dropdown.Item
                                onClick={logoutHandler}
                                className="text-danger"
                            >
                                Logout
                            </Dropdown.Item>

                        </Dropdown.Menu>

                    </Dropdown>

                ) : (

                    <Link
                        to="/login"
                        className="btn"
                        id="login_btn"
                    >
                        Login
                    </Link>

                )}

                <Link to="/cart">

                    <span id="cart" className="ml-3">
                        Cart
                    </span>

                </Link>

                <span className="ml-1" id="cart_count">
                    {cartItems.length}
                </span>

            </div>

        </nav>
    );
}