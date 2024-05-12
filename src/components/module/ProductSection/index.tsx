import ProductGrid from "@/components/layout/ProductGrid";
import { usePokemonCard } from "@/store/usePokemonCard";
import { getQuantityFromCartItem } from "@/utils/getQuantityFromCartItem";
import ProductCard, { LoadingProductCard } from "../ProductCard";
import { useCart } from "@/store/useCart";
import ProductFilter from "../ProductFilter";
import Pagination from "@/components/base/Pagination";
import EmptyPlaceholder from "./EmptyPlaceholder";

const ProductSection = () => {
  const {
    pokemonCards,
    loading,
    sets,
    types,
    rarities,
    currentQuery,
    nextPage,
    prevPage,
    goToPage,
    totalPages,
    filterByType,
    filterByRarity,
    filterBySet,
    clearFilters,
  } = usePokemonCard();

  const { addToCart, cart, removeFromCart } = useCart();
  return (
    <>
      <ProductFilter
        onClearAll={clearFilters}
        disabled={loading}
        sets={sets}
        rarities={rarities}
        types={types}
        onSelectRarity={filterByRarity}
        onSelectSet={filterBySet}
        onSelectType={filterByType}
      />
      <ProductGrid>
        {!loading &&
          !!pokemonCards?.data?.length &&
          pokemonCards?.data.map((card) => (
            <ProductCard
              key={card.id}
              name={card.name}
              image={card.images.small}
              stock={card.set.total - getQuantityFromCartItem(cart, card.id)}
              price={card.cardmarket?.prices?.averageSellPrice}
              count={getQuantityFromCartItem(cart, card.id)}
              onAddToCart={() => addToCart(card.id)}
              onDecrement={() => removeFromCart(card.id)}
            />
          ))}
        {loading &&
          new Array(30)
            .fill(0)
            .map((_, index) => <LoadingProductCard key={index} />)}
      </ProductGrid>
      {!loading && !pokemonCards?.data?.length && <EmptyPlaceholder />}
      {!loading && (
        <Pagination
          disabled={loading}
          totalPages={totalPages}
          currentPage={currentQuery.page || 1}
          onNext={nextPage}
          onPrevious={prevPage}
          goToPage={goToPage}
        />
      )}
    </>
  );
};

export default ProductSection;
