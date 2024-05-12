export type Ability = {
  name: string;
  text: string;
  type: string;
};

export type Attack = {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
};

export type Weakness = {
  type: string;
  value: string;
};

export type Set = {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: {
    unlimited: string;
    standard: string;
    expanded: string;
  };
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: {
    symbol: string;
    logo: string;
  };
};

export type Images = {
  small: string;
  large: string;
};

export type Price = {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow: number;
};

export type Tcgplayer = {
  url: string;
  updatedAt: string;
  prices: {
    normal: Price;
    reverseHolofoil: Price;
  };
};

export type Cardmarket = {
  url: string;
  updatedAt: string;
  prices: {
    averageSellPrice: number;
    lowPrice: number;
    trendPrice: number;
    germanProLow: null | number;
    suggestedPrice: null | number;
    reverseHoloSell: null | number;
    reverseHoloLow: null | number;
    reverseHoloTrend: null | number;
    lowPriceExPlus: number;
    avg1: number;
    avg7: number;
    avg30: number;
    reverseHoloAvg1: null | number;
    reverseHoloAvg7: null | number;
    reverseHoloAvg30: null | number;
  };
};

export type PokemonCard = {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  types: string[];
  evolvesFrom: string;
  abilities: Ability[];
  attacks: Attack[];
  weaknesses: Weakness[];
  retreatCost: string[];
  convertedRetreatCost: number;
  set: Set;
  number: string;
  artist: string;
  rarity: string;
  flavorText: string;
  nationalPokedexNumbers: number[];
  legalities: {
    unlimited: string;
    standard: string;
    expanded: string;
  };
  images: Images;
  tcgplayer: Tcgplayer;
  cardmarket: Cardmarket;
};

export type PagablePokemonCard = {
  data: PokemonCard[];
  page: number;
  pageSize: number;
  totalCount: number;
};

export type PokemonCardQuery = {
  /**
   * @param q - The query string to search for. If omitted, it will return all cards.
   */
  q?: string;

  /**
   * @param page - The page number to return. If omitted, it will return the first page.
   */
  page?: number;
  /**
   * @param pageSize - The number of cards to return. If omitted, it will return the first 100 cards.
   */
  pageSize: number;
  /**
   * @param orderBy - The order to return the cards. If omitted, it will return the cards in ascending order.
   */
  orderBy?: string;

  /**
   * @param select - The fields to return in the response. If omitted, it will return all fields.
   */
  select?: string;
};

export type SetQuery = {
  /**
   * @param id - The id of the set to return.
   */
  id: string;
  /**
   * @param select - The fields to return in the response. If omitted, it will return all fields.
   */
  select?: string;
};
