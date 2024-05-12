import ProductGrid from "./components/layout/ProductGrid";
import CartDrawer from "./components/module/CartDrawer";
import Navbar from "./components/module/Navbar";
import ProductCard from "./components/module/ProductCard";
import ProductFilter from "./components/module/ProductFilter";
import { useCart } from "./store/useCart";
import { usePokemonCard } from "./store/usePokemonCard";

function App() {
  const { pokemonCards, loading, sets, types, rarities } = usePokemonCard();
  const { openCart, setOpenCart, clearCart, addToCart, removeFromCart, cart } =
    useCart();

  return (
    <>
      <Navbar onCartClick={() => setOpenCart(true)} onSearch={() => {}} />
      <CartDrawer
        isOpen={openCart}
        setIsOpen={setOpenCart}
        onClearAll={clearCart}
        onDecrement={removeFromCart}
        onIncrement={addToCart}
        items={cart}
      />
      <ProductFilter
        sets={sets}
        rarities={rarities}
        types={types}
        onSelectRarity={() => {}}
        onSelectSet={() => {}}
        onSelectType={() => {}}
      />
      {loading && <div>Loading...</div>}
      {!loading && (
        <ProductGrid>
          {pokemonCards?.data.map((card) => (
            <ProductCard
              key={card.id}
              name={card.name}
              image={card.images.small}
              stock={
                card.set.total -
                (cart?.find((item) => item.data.id === card.id)?.quantity || 0)
              }
              price={card.cardmarket.prices.averageSellPrice}
              count={
                cart?.find((item) => item.data.id === card.id)?.quantity || 0
              }
              onAddToCart={() => addToCart(card.id)}
              onDecrement={() => removeFromCart(card.id)}
            />
          ))}
        </ProductGrid>
      )}
    </>
  );
}

export default App;
