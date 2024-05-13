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

/**
 * @info shimmershards documentation
 * @link https://shimmershards.dev
 *
 */

// define shards
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

// define repository service
const pokemonRepository = new PokemonCardRepository(new PokemonCardService());

export const usePokemonCard = memo(() => {
  const [pokemonCards, setPokemonCards] = useShard(pokemonCardShard);
  const [currentQuery, setCurrentQuery] = useShard(currentQueryShard);
  const [types, setTypes] = useShard(typeShard);
  const [rarities, setRarities] = useShard(rarityShard);
  const [sets, setSets] = useShard(setShard);
  const [loading, setLoading] = useShard(loadingShard);
  const [totalPages, setTotalPages] = useShard(totalPagesShard);

  // get pokemon types
  const getTypes = useCallback(() => {
    pokemonRepository
      .getTypes()
      // map the response to Option type
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

  // get pokemon rarities
  const getRarities = useCallback(() => {
    pokemonRepository
      .getRarities()
      // map the response to Option type
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

  // get pokemon sets
  const getSets = useCallback(() => {
    pokemonRepository
      .getSets()
      // map the response to Option type
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

  // get pokemon cards
  const getPokemonCards = useCallback((query: PokemonCardQuery) => {
    setLoading(true);
    pokemonRepository.getCards(query).subscribe({
      next: (cards) => {
        if (cards.totalCount === 0) {
          // if no cards found, set total pages to 1
          setTotalPages(1);
        } else {
          // calculate total pages
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

  const resetScroll = () => {
    window.scrollTo(0, 0);
  };

  const nextPage = () => {
    setCurrentQuery((prev) => ({
      ...prev,
      page: Counter.incrementByOne(prev.page || 1, 100),
    }));
    // reset scroll to top of the page for better UX
    resetScroll();
  };

  const prevPage = () => {
    setCurrentQuery((prev) => ({
      ...prev,
      page: Counter.decrementByOne(prev.page || 1, 1),
    }));
    // reset scroll to top of the page for better UX
    resetScroll();
  };

  const goToPage = (n: number) => {
    setCurrentQuery((prev) => ({
      ...prev,
      page: n,
    }));
    // reset scroll to top of the page for better UX
    resetScroll();
  };

  const filterByType = (type: string) => {
    setCurrentQuery((prev) => ({
      ...prev,
      // queryReplacer is a helper function to replace query params
      q: queryReplacer(prev.q || "", "types", type.toLowerCase()),
    }));
  };

  const filterByRarity = (rarity: string) => {
    setCurrentQuery((prev) => ({
      ...prev,
      page: 1,
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
      page: 1,
      // queryReplacer is a helper function to replace query params
      q: queryReplacer(prev.q || "", "set.id", set.toLowerCase()),
    }));
  };

  const clearFilters = () => {
    if (currentQuery?.q) {
      // reset query to default
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
      page: 1,
      // queryReplacer is a helper function to replace query params
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
