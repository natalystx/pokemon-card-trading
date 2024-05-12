import CartDrawer from "./components/module/CartDrawer";
import Navbar from "./components/module/Navbar";
import ProductSection from "./components/module/ProductSection";
import { useCart } from "./store/useCart";
import { usePokemonCard } from "./store/usePokemonCard";

function App() {
  const { openCart, setOpenCart, clearCart, addToCart, removeFromCart, cart } =
    useCart();
  const { onSearch } = usePokemonCard();

  return (
    <>
      <Navbar onCartClick={() => setOpenCart(true)} onSearch={onSearch} />
      <CartDrawer
        isOpen={openCart}
        setIsOpen={setOpenCart}
        onClearAll={clearCart}
        onDecrement={removeFromCart}
        onIncrement={addToCart}
        items={cart}
      />

      <ProductSection />
    </>
  );
}

export default App;
