import React, { createContext, useContext, useState } from 'react';
type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
};
type CartItem = {
    productId: number;
    quantity: number;
};
type ShopActions = {
    addToCart: (productId: number) => void;
    removeFromCart: (productId: number) => void;
}
// 商品データ
const initialProducts: Product[] = [
  { id: 1, name: 'Product A', price: 1000, stock: 5 },
  { id: 2, name: 'Product B', price: 2000, stock: 3 },
  { id: 3, name: 'Product C', price: 3000, stock: 0 }
];

// 各Contextを作成
const ProductsContext = createContext<Product[] | undefined>(undefined);
const CartContext = createContext<CartItem[] | undefined>(undefined);
const ShopActionsContext = createContext<ShopActions | undefined>(undefined);

function useProducts() {
    const context = useContext(ProductsContext);
    if(!context) {
        throw new Error('');
    }
    return context;
}
function useCarts() {
    const context = useContext(CartContext);
    if(!context) {
        throw new Error('');
    }
    return context;
}
function useShopActions() {
    const context = useContext(ShopActionsContext);
    if(!context) {
        throw new Error('');
    }
    return context;
}

function ShopProvider({ children }: { children: React.ReactNode } ) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);

  // カートに追加
  const addToCart = (productId: number) => {
    // 在庫チェック
    const product = products.find((p) => p.id === productId);
    if(!product || product.stock === 0) return;
    // カートに追加
    setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.productId === productId);
        if(existingItem) {
            return prevCart.map((item) =>
                item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
        } else {
            return [...prevCart, {productId, quantity: 1}];
        }
    })
    // 在庫を減らす
    setProducts((prevProducts) =>
        prevProducts.map((p) =>
            p.id === productId ? {...p, stock: p.stock - 1} : p
        )
    )
  };

  // カートから削除
  const removeFromCart = (productId: number) => {
    // カートから削除
    const cartItem = cart.find((item) => item.productId === productId);
    if(!cartItem) return;
    setCart((prevCart) => {
        const item = prevCart.find((item) => item.productId === productId);
        if(!item) return prevCart;
        if(item.quantity === 1) {
            return prevCart.filter((item) => item.productId !== productId);
        }
        return prevCart.map((item) =>
            item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
    })
    // 在庫を戻す
    setProducts((prevProducts) =>
        prevProducts.map((p) =>
            p.id === productId ? {...p, stock: p.stock + 1} : p
        )
    );
  };
  return (
    // 複数のProviderで値を提供
    <ProductsContext value={products}>
        <CartContext value={cart}>
            <ShopActionsContext value={{addToCart, removeFromCart}}>
                {children}
            </ShopActionsContext>
        </CartContext>
    </ProductsContext>
  );
}

function ProductList() {
    // 商品リストを表示
    const products = useProducts();
    const { addToCart } = useShopActions()
    return (
        <div>
        <h2>Products</h2>
        {products.map((product) => (
            <div key={product.id} style={{ marginBottom: "10px" }}>
            <span>
                {product.name} - ¥{product.price}
            </span>
            <span style={{ marginLeft: "10px" }}>
                在庫: {product.stock}
            </span>
            <button
                onClick={() => addToCart(product.id)}
                disabled={product.stock === 0}
                style={{ marginLeft: "10px" }}
            >
                カートに追加
            </button>
            </div>
        ))}
        </div>
    );
}

function Cart() {
    // カート内容を表示
    const products = useProducts()
    const cart = useCarts()
    const { removeFromCart }= useShopActions()
    // 合計金額
    const totalPrice = cart.reduce((total, item) => {
        const product = products.find((p) => p.id === item.productId);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);

    return (
        <div>
        <h2>Cart</h2>
        {cart.length === 0 ? (
            <p>カートは空です</p>
        ) : (
            cart.map((item) => {
            const product = products.find(
                (p) => p.id === item.productId
            );
            if (!product) return null;
            return (
                <div
                key={item.productId}
                style={{ marginBottom: "10px" }}
                >
                <span>
                    {product.name} x {item.quantity}
                </span>
                <span style={{ marginLeft: "10px" }}>
                    ¥{product.price * item.quantity}
                </span>
                <button
                    onClick={() => removeFromCart(item.productId)}
                    style={{ marginLeft: "10px" }}
                >
                    削除
                </button>
                </div>
            );
            })
        )}
        <p style={{ fontWeight: "bold", marginTop: "20px" }}>
            Total: ¥{totalPrice}
        </p>
        </div>
    );
}

export default function ComplexContext() {
    return (
        <ShopProvider>
            <ProductList />
            <Cart />
        </ShopProvider>
    );
}
