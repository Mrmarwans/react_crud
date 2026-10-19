
import { Link } from "react-router";

export default function Home() {
  return (
    <section>
      <h1>Welcome to Mini Shop</h1>

      <p>
        This is our home page.
        Learn how React Router works!
      </p>

      <Link to="/products" className="button">
        Browse Products
      </Link>
    </section>
  );
}
