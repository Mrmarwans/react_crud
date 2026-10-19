import { Link } from "react-router";
import { products } from "../data/products";

// Helper for contextual icons
function getProductIcon(name = "") {
  const lower = name.toLowerCase();
  if (lower.includes("mouse")) return "🖱️";
  if (lower.includes("keyboard")) return "⌨️";
  if (lower.includes("headset") || lower.includes("headphone")) return "🎧";
  return "📦";
}

export default function ProductsPage() {
  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-8 border-b border-slate-200/80 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Explore Products
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Browse our hand-picked collection of premium tech essentials
          </p>
        </div>
        <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          {products.length} Products Available
        </span>
      </div>

      {/* ── Products Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <article
            key={product.id}
            className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col justify-between"
          >
            <div>
              {/* Product Icon & Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100/70 border border-blue-100 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {getProductIcon(product.name)}
                </div>
                <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                  Tech
                </span>
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                {product.name}
              </h2>

              {/* Description */}
              <p className="text-slate-500 text-sm mt-2 leading-relaxed line-clamp-2">
                {product.description || "High quality product built for daily performance and long durability."}
              </p>
            </div>

            {/* Bottom: Price & Button */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-xs font-medium text-slate-400 block">Price</span>
                  <span className="text-2xl font-black text-slate-900 tracking-tight">
                    ${product.price}
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  In Stock
                </span>
              </div>

              {/* Action Button */}
              <Link
                to={`/products/${product.id}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200"
              >
                <span>View Details</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}