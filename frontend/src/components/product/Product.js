import { Link } from "react-router-dom";

export default function Product({ product, col = 4 }) {
  const getImageUrl = (img) => {
    if (!img) return "/images/products/1.jpg";
    const url = typeof img === "string" ? img : img?.image;
    if (!url) return "/images/products/1.jpg";
    if (url.startsWith("http")) return url;
    if (url.startsWith("/uploads")) return `http://localhost:8000${url}`;
    return url;
  };

  if (!product) return null;

  const image = getImageUrl(product?.images?.[0]);

  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 h-100">
        <img
          className="card-img-top mx-auto"
          src={image}
          alt={product?.name || "Product"}
          onError={(e) => {
            e.target.src = "/images/products/1.jpg";
          }}
        />

        <h5 className="card-title">
          <Link to={`/product/${product?._id}`}>
            {product?.name}
          </Link>
        </h5>

        <div className="ratings mt-auto">
          <div className="rating-stars">
            <div className="rating-stars-empty">★★★★★</div>
            <div
              className="rating-stars-filled"
              style={{
                width: `${((product?.ratings || 0) / 5) * 100}%`,
              }}
            >★★★★★</div>
          </div>

          <span id="no_of_reviews">
            ({product?.numOfReviews || 0} Reviews)
          </span>
        </div>

        <p className="card-text mt-2">
          ${product?.price || 0}
        </p>

        <Link
          to={`/product/${product?._id}`}
          id="view_btn"
          className="btn btn-block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
