// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// export default function Profile() {

//     const { user } = useSelector(state => state.authState);

//     return (

//         <div className="row justify-content-around mt-5 user-info">

//             <div className="col-12 col-md-3">

//                 <figure className='avatar avatar-profile'>

//                    <img
//     className="rounded-circle img-fluid"
//     src={
//         user?.avatar
//             ? `${user.avatar}?t=${Date.now()}`
//             : "/images/default_avatar.jpg"
//     }
//     alt="profile"
//     onError={(e) => {
//         console.log("Image failed:", e.target.src);
//         e.target.src = "/images/default_avatar.jpg";
//     }}
// />
//                 </figure>

//                 <Link
//                     to='/myprofile/update'
//                     id="edit_profile"
//                     className="btn btn-primary btn-block my-5"
//                 >
//                     Edit Profile
//                 </Link>

//             </div>

//             <div className="col-12 col-md-5">

//                 <h4>Full Name</h4>

//                 <p>{user?.name}</p>

//                 <h4>Email Address</h4>

//                 <p>{user?.email}</p>

//                 <h4>Joined</h4>

//                 <p>
//                     {user?.createdAt
//                         ? user.createdAt.substring(0, 10)
//                         : ""}
//                 </p>

//                 <Link to="/orders" className="btn btn-danger btn-block mt-5">
//                     My Orders
//                 </Link>

//                 <Link to="/myprofile/update/password" className="btn btn-primary btn-block mt-3">
//                     Change Password
//                 </Link>

//             </div>

//         </div>
//     );
// }




import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
    const { user } = useSelector((state) => state.authState);

    return (
        <div className="row justify-content-around mt-5 user-info">

            {/* LEFT SIDE - USER INFO */}
            <div className="col-12 col-md-3">

                <figure className="avatar avatar-profile">

                    <img
                        className="rounded-circle img-fluid"
                        src={
                            user?.avatar
                                ? `${user.avatar}?t=${Date.now()}`
                                : "/images/default_avatar.jpg"
                        }
                        alt="profile"
                        onError={(e) => {
                            e.target.src = "/images/default_avatar.jpg";
                        }}
                    />
                </figure>

                <Link
                    to="/myprofile/update"
                    id="edit_profile"
                    className="btn btn-primary btn-block my-5"
                >
                    Edit Profile
                </Link>
            </div>

            {/* RIGHT SIDE - USER INFO */}
            <div className="col-12 col-md-5">

                <h4>Full Name</h4>
                <p>{user?.name}</p>

                <h4>Email Address</h4>
                <p>{user?.email}</p>

                <h4>Joined</h4>
                <p>
                    {user?.createdAt
                        ? user.createdAt.substring(0, 10)
                        : ""}
                </p>

                <Link to="/orders" className="btn btn-danger btn-block mt-5">
                    My Orders
                </Link>

                <Link
                    to="/myprofile/update/password"
                    className="btn btn-primary btn-block mt-3"
                >
                    Change Password
                </Link>
            </div>

            {/* 🔥 ORDERS SECTION (FIXED) */}
            <div className="col-12 mt-5">

                <h3 className="mb-4">My Orders</h3>

                {user?.orders && user.orders.length > 0 ? (
                    user.orders.map((order) => (
                        <div key={order._id} className="card p-3 mb-3 shadow-sm">

                            <h5>Order ID: {order._id}</h5>

                            {/* ORDER ITEMS */}
                            {order.orderItems?.length > 0 ? (
                                order.orderItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="d-flex align-items-center mb-3"
                                    >

                                        <img
                                            src={
                                                item.image ||
                                                item.product?.images?.[0] ||
                                                "/images/products/1.jpg"
                                            }
                                            alt={item.name}
                                            width="60"
                                            height="60"
                                            style={{ objectFit: "cover", marginRight: "10px" }}
                                            onError={(e) => {
                                                e.target.src = "/images/products/1.jpg";
                                            }}
                                        />

                                        <div>
                                            <p className="mb-0">
                                                <strong>{item.name}</strong>
                                            </p>
                                            <small>Qty: {item.quantity}</small>
                                        </div>

                                    </div>
                                ))
                            ) : (
                                <p>No items in this order</p>
                            )}

                        </div>
                    ))
                ) : (
                    <p className="text-muted">No orders found</p>
                )}

            </div>
        </div>
    );
}