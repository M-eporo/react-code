import React from 'react';
import { useState } from 'react';
type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    inStock: boolean;
};
type Category = "all" | "電子機器" | "家具" | "文具";
const ProductFilter = () => {
    const [products] = useState<Product[]>([
        {
            id: 1,
            name: "ノートPC",
            category: "電子機器",
            price: 80000,
            inStock: true,
        },
        { id: 2, name: "マウス", category: "電子機器", price: 3000, inStock: true },
        { id: 3, name: "机", category: "家具", price: 25000, inStock: false },
        { id: 4, name: "椅子", category: "家具", price: 15000, inStock: true },
        { id: 5, name: "ペン", category: "文具", price: 100, inStock: true },
        { id: 6, name: "ノート", category: "文具", price: 200, inStock: false },
    ]);

    const [selectedCategory, setSelectedCategory] = useState<Category>("all");
    const [maxPrice, setMaxPrice] = useState(100000);

    const filteredProducts = products.filter((product) => {
        const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
        const priceMatch = product.price <= maxPrice;
        return categoryMatch && priceMatch;
    });

    return (
        <div>
            <h2>商品フィルター</h2>
            <div className="filters">
                <select name="" id="" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value as Category)}>
                    <option value="all">全カテゴリー</option>
                    <option value="電子機器">電子機器</option>
                    <option value="家具">家具</option>
                    <option value="文具">文具</option>
                </select>
                <label htmlFor="">
                    最大価格: ￥{maxPrice.toLocaleString()}
                    <input type="range"
                        min="0" max="100000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
                </label>
            </div>
            <p>検索結果: {filteredProducts.length} 件</p>
            <div className="product-list">
                {filteredProducts.map((product) => (
                    <div key={product.id} className={product.inStock ? "product-item in-stock" : "product-item out-of-stock"}>
                        <h3>{product.name}</h3>
                        <p>カテゴリー: {product.category}</p>
                        <p>価格: ￥{product.price.toLocaleString()}</p>
                        <p>在庫: {product.inStock ? "在庫あり" : "在庫なし"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductFilter
