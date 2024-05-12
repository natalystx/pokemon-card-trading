import { getPokemonCard } from "./getPokemonCard";

export const getPagablePokemon = () => {
  return {
    data: [getPokemonCard()],
    page: 1,
    pageSize: 1,
    totalCount: 1,
  };
};
