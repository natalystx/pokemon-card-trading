import { effect, memo, shard, useShard } from "shimmershards";
import { PagablePokemonCard, PokemonCardQuery } from "../types";
import PokemonCardRepository from "@/repositories/pokemon.repository";
import PokemonCardService from "@/repositories/pokemon.service";
import Counter from "@/utils/counter";
import { useCallback } from "react";
import { Option } from "@/components/base/Dropdown";
import { map } from "rxjs";
import { toOption } from "@/utils/toOption";

const pokemonCardShard = shard<PagablePokemonCard | null>(null);
const loadingShard = shard<boolean>(true);
const currentQueryShard = shard<PokemonCardQuery>({
  page: 1,
  pageSize: 20,
});
const typeShard = shard<Option[]>([]);
const rarityShard = shard<Option[]>([]);
const setShard = shard<Option[]>([]);

const pokemonRepository = new PokemonCardRepository(new PokemonCardService());

export const usePokemonCard = memo(() => {
  const [pokemonCards, setPokemonCards] = useShard(pokemonCardShard);
  const [currentQuery, setCurrentQuery] = useShard(currentQueryShard);
  const [types, setTypes] = useShard(typeShard);
  const [rarities, setRarities] = useShard(rarityShard);
  const [sets, setSets] = useShard(setShard);
  const [loading, setLoading] = useShard(loadingShard);

  const getTypes = useCallback(() => {
    pokemonRepository
      .getTypes()
      .pipe(map((i) => i.map((d) => toOption(d))))
      .subscribe({
        next: (types) => {
          setTypes([...types]);
        },
        error: () => {
          setTypes([]);
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRarities = useCallback(() => {
    pokemonRepository
      .getRarities()
      .pipe(map((i) => i.map((d) => toOption(d))))
      .subscribe({
        next: (rarities) => {
          setRarities([...rarities]);
        },
        error: () => {
          setRarities([]);
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSets = useCallback(() => {
    pokemonRepository
      .getSets()
      .pipe(map((i) => i.map((d) => toOption(d.name))))
      .subscribe({
        next: (sets) => {
          setSets([...sets]);
        },
        error: () => {
          setSets([]);
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPokemonCards = useCallback(() => {
    setLoading(true);
    pokemonRepository.getCards(currentQuery).subscribe({
      next: (cards) => {
        setPokemonCards(cards);
        setLoading(false);
      },
      error: () => {
        setLoading(false);
        setPokemonCards(null);
      },
      complete: () => {
        setLoading(false);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextPage = () => {
    setCurrentQuery((prev) => ({
      ...prev,
      page: Counter.incrementByOne(prev.page || 1, 100),
    }));
  };

  const prevPage = () => {
    setCurrentQuery((prev) => ({
      ...prev,
      page: Counter.decrementByOne(prev.page || 1, 1),
    }));
  };

  effect(() => {
    getPokemonCards();
    getTypes();
    getSets();
    getRarities();
  }, []);

  return {
    pokemonCards,
    loading,
    nextPage,
    prevPage,
    types,
    rarities,
    sets,
  };
});
