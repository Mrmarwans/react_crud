import { Link, useParams } from "react-router";
import { products } from "../data/products";

export default function ProductDetails() {
    const { id } = useParams();
    const product = products.find((p) => p.id === id);

    if (!product) {
        return <div>Product not found</div>; 
    }

    return (
        <>
        <div style={{ width: "50%", margin: "0 auto" }}>
            <h1>{product.name}</h1>
            <p>Price: ${product.price}</p>
        </div>


        <Link to="/products">Back to Products</Link>

        </>
    );
}   