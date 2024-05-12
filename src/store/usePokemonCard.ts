import { effect, memo, shard, useShard } from "shimmershards";
import { PagablePokemonCard, PokemonCardQuery } from "../types";
import PokemonCardRepository from "@/repositories/pokemon.repository";
import PokemonCardService from "@/repositories/pokemon.service";
import Counter from "@/utils/counter";
import { useCallback } from "react";
import { Option } from "@/components/base/Dropdown";
import { map } from "rxjs";
import { toOption } from "@/utils/toOption";
import { queryReplacer } from "@/utils/queryReplacer";

const pokemonCardShard = shard<PagablePokemonCard | null>(null);
const loadingShard = shard<boolean>(true);
const currentQueryShard = shard<PokemonCardQuery>({
  page: 1,
  pageSize: 50,
});
const typeShard = shard<Option[]>([]);
const rarityShard = shard<Option[]>([]);
const setShard = shard<Option[]>([]);
const totalPagesShard = shard<number>(0);

const pokemonRepository = new PokemonCardRepository(new PokemonCardService());

export const usePokemonCard = memo(() => {
  const [pokemonCards, setPokemonCards] = useShard(pokemonCardShard);
  const [currentQuery, setCurrentQuery] = useShard(currentQueryShard);
  const [types, setTypes] = useShard(typeShard);
  const [rarities, setRarities] = useShard(rarityShard);
  const [sets, setSets] = useShard(setShard);
  const [loading, setLoading] = useShard(loadingShard);
  const [totalPages, setTotalPages] = useShard(totalPagesShard);

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
      .pipe(map((i) => i.map((d) => ({ label: d.name, value: d.id }))))
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

  const getPokemonCards = useCallback((query: PokemonCardQuery) => {
    setLoading(true);
    pokemonRepository.getCards(query).subscribe({
      next: (cards) => {
        if (cards.totalCount === 0) {
          setTotalPages(1);
        } else {
          setTotalPages(Math.ceil(cards.totalCount / currentQuery.pageSize));
        }
        setPokemonCards(cards);
        setLoading(false);
      },
      error: () => {
        setLoading(false);
        setPokemonCards(null);
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

  const goToPage = (n: number) => {
    setCurrentQuery((prev) => ({
      ...prev,
      page: n,
    }));
  };

  const filterByType = (type: string) => {
    setCurrentQuery((prev) => ({
      ...prev,
      q: queryReplacer(prev.q || "", "types", type.toLowerCase()),
    }));
  };

  const filterByRarity = (rarity: string) => {
    setCurrentQuery((prev) => ({
      ...prev,
      q: queryReplacer(
        prev.q || "",
        "rarity",
        rarity.replace(" ", "").toLowerCase()
      ),
    }));
  };

  const filterBySet = (set: string) => {
    setCurrentQuery((prev) => ({
      ...prev,
      q: queryReplacer(prev.q || "", "set.id", set.toLowerCase()),
    }));
  };

  const clearFilters = () => {
    if (currentQuery?.q) {
      setCurrentQuery((prev) => ({
        ...prev,
        page: 1,
        q: "",
      }));
    }
  };

  const onSearch = useCallback((search: string) => {
    setCurrentQuery((prev) => ({
      ...prev,
      q: queryReplacer(prev.q || "", "name", `${search.toLowerCase()}*`),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  effect(() => {
    if (pokemonCards !== null) {
      getPokemonCards(currentQuery);
    }
  }, [currentQuery]);

  effect(() => {
    setLoading(true);
    getPokemonCards(currentQuery);
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
    totalPages,
    currentQuery,
    goToPage,
    filterByType,
    filterByRarity,
    filterBySet,
    clearFilters,
    onSearch,
  };
});
