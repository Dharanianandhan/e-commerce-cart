import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { getAdminProducts } from "../../actions/productActions";


export default function Dashboard(){
  const {products=[]}=useSelector(state=>state.productsState);
  const dispatch=useDispatch();
  let outOfStock = 0;
  if (products && products.length > 0) {
    products.forEach((product) => {
      const stock = Number(product.stock);
      if (!Number.isNaN(stock) && stock === 0) {
        outOfStock += 1;
      }
    });
  }

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);
  return(
    <div className="admin-layout">
      <Sidebar />

      <main className="dashboard-content dashboard-serif">
        <h1 className="dashboard-title">Dashboard</h1>

        <div className="total-banner">
          <div className="total-label">Total Amount</div>
          <div className="total-value">$3425</div>
        </div>

        <div className="stat-panels">
          <div className="stat-panel stat-green">
            <div className="panel-label">Products</div>
            <div className="panel-count">{products.length}</div>
            <a className="panel-footer" href="/admin/products">View Details <span className="chev">›</span></a>
          </div>

          <div className="stat-panel stat-red">
            <div className="panel-label">Orders</div>
            <div className="panel-count">345</div>
            <a className="panel-footer" href="/admin/orders">View Details <span className="chev">›</span></a>
          </div>

          <div className="stat-panel stat-teal">
            <div className="panel-label">Users</div>
            <div className="panel-count">55</div>
            <a className="panel-footer" href="/admin/users">View Details <span className="chev">›</span></a>
          </div>

          <div className="stat-panel stat-yellow">
            <div className="panel-label">Out of Stock</div>
            <div className="panel-count">{outOfStock}</div>
            <a className="panel-footer" href="#">View Details <span className="chev">›</span></a>
          </div>
        </div>

        
      </main>
    </div>
  )
}